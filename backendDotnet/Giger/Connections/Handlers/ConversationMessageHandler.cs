using Giger.Connections.Payloads;
using Giger.Connections.SocketsManagment;
using Giger.Models.MessageModels;
using Giger.Services;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace Giger.Connections.Handlers
{
    public class ConversationMessageHandler : SocketHandler
    {
        ConversationService _conversationService;

        public ConversationMessageHandler(ConnectionsManager connections, ConversationService conversationService) : base(connections)
        {
            _conversationService = conversationService;
        }

        public async Task SendMessageAsync(IEnumerable<string> participants, string converasationId, Message message)
        {
            var payload = new MessagePayload
            {
                ConversationId = converasationId,
                Message = message
            };
            var serializedMessage = JsonSerializer.Serialize(payload);
            await base.SendMessageToParticipantsAsync(serializedMessage, participants);
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
                }
            } 
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
