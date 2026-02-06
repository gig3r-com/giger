using Giger.Connections.Payloads;
using Giger.Connections.SocketsManagment;
using Giger.Models.Logs;
using Giger.Models.MessageModels;
using Giger.Services;
using System.Linq;
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
                _ = LogMessageAsync(message, converasationId);
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
                using var scope = _serviceProvider.CreateScope();
                var conversationService = scope.ServiceProvider.GetRequiredService<ConversationService>();
                var dbContext = scope.ServiceProvider.GetRequiredService<GigerDbContext>();
                
                var msg = Encoding.UTF8.GetString(buffer, 0, result.Count);
                Console.WriteLine($"[WebSocket] Received message: {msg}");
                
                var incomingPayload = JsonSerializer.Deserialize<IncomingMessagePayload>(msg);
                
                if (incomingPayload == null || incomingPayload.Message == null)
                {
                    Console.WriteLine("[WebSocket] Payload or Message is null");
                    return;
                }
                
                Console.WriteLine($"[WebSocket] ConversationId: {incomingPayload.ConversationId}, Sender: {incomingPayload.Message.Sender}");
                
                var conversation = await conversationService.GetAsync(incomingPayload.ConversationId);
                if (conversation != null)
                {
                    Console.WriteLine($"[WebSocket] Found conversation, creating message...");
                    
                    // Parse timestamp and ensure it's UTC
                    DateTime timestamp;
                    if (DateTime.TryParse(incomingPayload.Message.Date, out var parsedDate))
                    {
                        // If parsed date is not UTC, convert it
                        timestamp = parsedDate.Kind == DateTimeKind.Utc ? parsedDate : DateTime.SpecifyKind(parsedDate, DateTimeKind.Utc);
                    }
                    else
                    {
                        timestamp = DateTime.UtcNow;
                    }
                    
                    // Convert incoming DTO to full Message model
                    var message = new Message
                    {
                        Id = string.IsNullOrEmpty(incomingPayload.Message.Id) ? Guid.NewGuid().ToString() : incomingPayload.Message.Id,
                        ConversationId = incomingPayload.ConversationId,
                        Timestamp = timestamp,
                        Sender = incomingPayload.Message.Sender,
                        Type = "TEXT",
                        Data = incomingPayload.Message.Text,
                        Hacker = "",
                        EpsilonNote = ""
                    };
                    
                    Console.WriteLine($"[WebSocket] Adding message to DB, ID: {message.Id}");
                    
                    // Add message directly to DbContext instead of through conversation
                    dbContext.Messages.Add(message);
                    await dbContext.SaveChangesAsync();
                    
                    Console.WriteLine($"[WebSocket] Message saved successfully, broadcasting...");
                    
                    // Send back a simple DTO without navigation properties
                    var outgoingPayload = new
                    {
                        ConversationId = incomingPayload.ConversationId,
                        IsGigConveration = incomingPayload.IsGigConveration,
                        Message = new
                        {
                            message.Id,
                            Date = message.Timestamp.ToString("o"),
                            message.Sender,
                            Text = message.Data
                        }
                    };
                    var outgoingMessage = JsonSerializer.Serialize(outgoingPayload);
                    await SendMessageToParticipantsAsync(outgoingMessage, conversation.Participants.Select(p => p.UserHandle));
                    
                    Console.WriteLine($"[WebSocket] Message broadcast complete");
                    
                    _ = LogMessageAsync(message, incomingPayload.ConversationId);
                }
                else
                {
                    Console.WriteLine($"[WebSocket] Conversation {incomingPayload.ConversationId} not found!");
                }
            } 
            catch (Exception ex)
            {
                Console.WriteLine($"[WebSocket] Error receiving message: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"[WebSocket] Inner exception: {ex.InnerException.Message}");
                    Console.WriteLine(ex.InnerException.StackTrace);
                }
            }
        }

        private async Task LogMessageAsync(Message message, string conversationId)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var userService = scope.ServiceProvider.GetRequiredService<UserService>();
                var conversationService = scope.ServiceProvider.GetRequiredService<ConversationService>();
                var logService = scope.ServiceProvider.GetRequiredService<LogService>();

                var user = await userService.GetByUserNameAsync(message.Sender);
                var conversation = await conversationService.GetAsync(conversationId);
                var participantHandles = string.Join(',', conversation.Participants.Select(p => p.UserHandle));
                var log = new Log()
                {
                    Id = Guid.NewGuid().ToString(),
                    Timestamp = GigerDateTime.Now,
                    SourceUser = user.Handle,
                    TargetUser = participantHandles,
                    LogType = conversation.GigConversation ? "GIG_MESSAGESENT" : "MESSAGE",
                    LogData = $"Message has been sent by {user.Handle} to {participantHandles} user(s).",
                    Subnetwork = user.Subnetwork,
                };

                await logService.CreateAsync(log);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[LogMessage] Error logging message: {ex.Message}");
            }
        }
    }
}
