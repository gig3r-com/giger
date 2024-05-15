using Giger.Connections.Payloads;
using Giger.Connections.SocketsManagment;
using System.Net.WebSockets;
using System.Text.Json;

namespace Giger.Connections.Handlers
{
    public class NotificationsSocketHandler : SocketHandler
    {
        public NotificationsSocketHandler(ConnectionsManager connections) : base(connections) { }

        public async Task NotifyAccount(string username, string accountId) 
            => await NotifyPayload(username, new NotificationPayload() { AccountId = accountId });

        public async Task NotifyTransaction(string username, string accountId, string transactionId) 
            => await NotifyPayload(username, new NotificationPayload() { AccountId = accountId, TransactionId = transactionId });
        
        public async Task NotifyGigConversation(string username, string gigIdConversation) 
            => await NotifyPayload(username, new NotificationPayload() { GigIdConversation = gigIdConversation });
        
        public async Task NotifyGigStatus(string username, string gigIdStatus) 
            => await NotifyPayload(username, new NotificationPayload() { GigIdStatus = gigIdStatus });
        
        public async Task NotifyConversationId(string username, string conversationId) 
            => await NotifyPayload(username, new NotificationPayload() { ConversationId = conversationId });
        
        public async Task NotifyUpdate()
        {
            var payload = new NotificationPayload() { UpdateRequired = true };
            await SendMessageToAllAsync(JsonSerializer.Serialize(payload));
        }

        private async Task NotifyPayload(string username, NotificationPayload payload)
        {
            var message = JsonSerializer.Serialize(payload);
            await SendMessageAsync(username, message);
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            if (result.MessageType == WebSocketMessageType.Close)
            {
                await OnDisconnected(socket);
                return;
            }
        }
    }
}
