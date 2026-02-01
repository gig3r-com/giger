using Giger.Connections.Payloads;
using Giger.Connections.SocketsManagment;
using Giger.Models.Logs;
using Giger.Models.MessageModels;
using Giger.Services;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace Giger.Connections.Handlers
{
    public class ConversationMessageHandler(ConnectionsManager connections, IServiceProvider _serviceProvider) : SocketHandler(connections)
    {
        public async Task SendMessageAsync(IEnumerable<string> participants, string converasationId, Message message)
        {
            try
            {
                var payload = new MessagePayload
                {
                    ConversationId = converasationId,
                    Message = message
                };
                var serializedMessage = JsonSerializer.Serialize(payload);
                await base.SendMessageToParticipantsAsync(serializedMessage, participants);
                LogMessage(message, converasationId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }


        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            if (result.MessageType == WebSocketMessageType.Close)
            {
                await OnDisconnected(socket);
                return;
            }

            try
            {
                var msg = Encoding.UTF8.GetString(buffer, 0, result.Count);
                DebugLogger.Log($"[WebSocket] Received message: {msg}");
                
                // Create a scope that lives for the entire operation
                using var scope = _serviceProvider.CreateScope();
                var conversationService = scope.ServiceProvider.GetRequiredService<ConversationService>();
                
                var payload = JsonSerializer.Deserialize<MessagePayload>(msg);
                
                // Handle ping messages
                if (payload?.ConversationId == null)
                {
                    return;
                }
                
                DebugLogger.Log($"[WebSocket] Parsed payload - ConvoId: {payload.ConversationId}, Sender: {payload.Message.Sender}");
                
                var conversation = await conversationService.GetAsync(payload.ConversationId);
                if (conversation != null)
                {
                    DebugLogger.Log($"[WebSocket] Found conversation with {conversation.Messages.Count} existing messages");
                    conversation.Messages.Add(payload.Message);
                    await conversationService.UpdateAsync(conversation);
                    DebugLogger.Log($"[WebSocket] Message saved successfully");
                    
                    var message = JsonSerializer.Serialize(payload);
                    var participantSockets = Connections.GetParticipants(conversation.Participants).ToList();
                    DebugLogger.Log($"[WebSocket] Found {participantSockets.Count} connected sockets for {conversation.Participants.Count()} participants");
                    
                    await SendMessageToParticipantsAsync(message, conversation.Participants);
                    DebugLogger.Log($"[WebSocket] Message sent to participants");
                }
                else
                {
                    Console.WriteLine($"[WebSocket] ERROR: Conversation {payload.ConversationId} not found");
                }
            } 
            catch (Exception ex)
            {
                Console.WriteLine($"[WebSocket] ERROR: {ex.Message}");
                Console.WriteLine($"[WebSocket] Stack trace: {ex.StackTrace}");
            }
        }

        private async void LogMessage(Message message, string conversationId, ConversationService? conversationService = null)
        {
            LogMessage(message, conversationId,
                conversationService ?? ScopedServiceProvider.CreateScopedGigerService<ConversationService>(_serviceProvider),
                ScopedServiceProvider.CreateScopedGigerService<LogService>(_serviceProvider),
                ScopedServiceProvider.CreateScopedGigerService<UserService>(_serviceProvider));
        }
        private async void LogMessage(Message message, string conversationId, ConversationService conversationService, LogService logService, UserService userService)
        {
            var user = await userService.GetByUserNameAsync(message.Sender);
            var conversation = await conversationService.GetAsync(conversationId);
            var log = new Log()
            {
                Id = Guid.NewGuid().ToString(),
                Timestamp = GigerDateTime.Now,
                SourceUserId = user.Id,
                SourceUserName = user.Handle,
                TargetUserId = conversation.Id,
                TargetUserName = string.Join(',', conversation.Participants),
                LogType = conversation.GigConversation ? LogType.GIG_MESSAGESENT : LogType.MESSAGE,
                LogData = $"Message has been sent by {user.Handle} to {string.Join(',', conversation.Participants)} user(s).",
                SubnetworkId = user.SubnetworkId,
                SubnetworkName = user.SubnetworkName,
            };

            logService.CreateAsync(log);
        }
    }
}
