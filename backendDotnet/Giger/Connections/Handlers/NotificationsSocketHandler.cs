using Giger.Connections.Payloads;
using Giger.Connections.SocketsManagment;
using Giger.Extensions;
using Giger.Models.GigModels;
using Giger.Models.Logs;
using Giger.Services;
using System.Net.WebSockets;
using System.Text.Json;

namespace Giger.Connections.Handlers
{
    public class NotificationsSocketHandler(ConnectionsManager connections, GigService gigService,
        UserService userService, LogService logService) : SocketHandler(connections)
    {
        private readonly GigService _gigService = gigService;
        private readonly UserService _userService = userService;
        private readonly LogService _logService = logService;

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
            try
            {
                var payload = new NotificationPayload() { UpdateRequired = true };
                await SendMessageToAllAsync(JsonSerializer.Serialize(payload));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private async Task NotifyPayload(string username, NotificationPayload payload)
        {
            try
            {
                var message = JsonSerializer.Serialize(payload);
                await SendMessageAsync(username, message);
                if (payload.GigIdStatus != null)
                {
                    LogGigStatusChanged(payload.GigIdStatus);
                }
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
        }

        private async void LogGigStatusChanged(string gigId)
        {
            var gig = await _gigService.GetAsync(gigId);
            var taker = await _userService.GetAsync(gig.TakenById);
            var author = await _userService.GetAsync(gig.AuthorId);

            var authorName = gig.IsAnonymizedAuthor ? Gig.ANONIMIZED : gig.AuthorName;
            string sourceId, sourceName, targetId, targetName, subnetworkId, subnetworkName;
            LogType logType;
            switch (gig.Status)
            {
                case GigStatus.AVAILABLE:
                    sourceId = author.Id;
                    sourceName = authorName;
                    subnetworkId = author.SubnetworkId;
                    subnetworkName = author.SubnetworkName;
                    targetId = null;
                    targetName = null;
                    logType = LogType.GIG_CREATED;
                    break;
                case GigStatus.IN_PROGRESS:
                    sourceId = taker.Id;
                    sourceName = taker.Handle;
                    subnetworkId = taker.SubnetworkId;
                    subnetworkName = taker.SubnetworkName;
                    targetId = author.Id;
                    targetName = authorName;
                    logType = LogType.GIG_ACCEPTED;
                    break;
                case GigStatus.PENDING_CONFIRMATION:
                    if (gig.Mode == GigModes.PROVIDER)
                    {
                        sourceId = author.Id;
                        sourceName = authorName;
                        subnetworkId = author.SubnetworkId;
                        subnetworkName = author.SubnetworkName;
                        targetId = taker.Id;
                        targetName = taker.Handle;
                    }
                    else
                    {
                        sourceId = taker.Id;
                        sourceName = taker.Handle;
                        subnetworkId = taker.SubnetworkId;
                        subnetworkName = taker.SubnetworkName;
                        targetId = author.Id;
                        targetName = authorName;
                    }
                    logType = LogType.GIG_UPDATED;
                    break;
                case GigStatus.DISPUTE:
                case GigStatus.COMPLETED:
                    if (gig.Mode == GigModes.CLIENT)
                    {
                        sourceId = author.Id;
                        sourceName = authorName;
                        subnetworkId = author.SubnetworkId;
                        subnetworkName = author.SubnetworkName;
                        targetId = taker.Id;
                        targetName = taker.Handle;
                    }
                    else
                    {
                        sourceId = taker.Id;
                        sourceName = taker.Handle;
                        subnetworkId = taker.SubnetworkId;
                        subnetworkName = taker.SubnetworkName;
                        targetId = author.Id;
                        targetName = authorName;
                    }
                    logType = LogType.GIG_UPDATED;
                    break;
                default:
                    return;
            }

            var log = new Log()
            {
                Id = Guid.NewGuid().ToString(),
                Timestamp = GigerDateTime.Now,
                SourceUserId = sourceId,
                SourceUserName = sourceName,
                TargetUserId = targetId,
                TargetUserName = targetName,
                LogType = logType,
                LogData = $"Gig {gig.Title} status has been changed to '{gig.Status.GetDescription()}' by {sourceName}.",
                SubnetworkId = subnetworkId,
                SubnetworkName = subnetworkName,
            };

            _logService.CreateAsync(log);
        }
    }
}
