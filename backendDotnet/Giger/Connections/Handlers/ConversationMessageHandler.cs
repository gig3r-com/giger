using Giger.Connections.Payloads;
using Giger.Connections.SocketsManagment;
using Giger.Models.Logs;
using Giger.Models.MessageModels;
using Giger.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace Giger.Connections.Handlers
{
    public class ConversationMessageHandler : SocketHandler
    {
        ConversationService _conversationService;
        LogService _logService;
        UserService _userService;
        private readonly IServiceProvider _serviceProvider;

        public ConversationMessageHandler(ConnectionsManager connections, 
            //ConversationService conversationService,             LogService logService, UserService userService,
            IServiceProvider serviceProvider
            ) : base(connections)
        {
            _serviceProvider = serviceProvider;
            //_conversationService = conversationService;
            //_logService = logService;
            //_userService = userService;
        }

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
                var payload = JsonSerializer.Deserialize<MessagePayload>(msg);
                var conversation = await _conversationService.GetAsync(payload.ConversationId);
                if (conversation != null)
                {
                    conversation.Messages.Add(payload.Message);
                    await _conversationService.UpdateAsync(conversation);
                    var message = JsonSerializer.Serialize(payload);
                    await SendMessageToParticipantsAsync(message, conversation.Participants);
                    LogMessage(payload.Message, payload.ConversationId);
                }
            } 
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private async void LogMessage(Message message, string conversationId)
        {
            var user = await _userService.GetByUserNameAsync(message.Sender);
            var conversation = await _conversationService.GetAsync(conversationId);
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

            _logService.CreateAsync(log);
        }
    }
}
