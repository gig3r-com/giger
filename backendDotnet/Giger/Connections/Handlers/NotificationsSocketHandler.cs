using Giger.Connections.Payloads;
using Giger.Connections.SocketsManagment;
using Giger.Extensions;
using Giger.Models.BankingModels;
using Giger.Models.GigModels;
using Giger.Models.Logs;
using Giger.Models.MessageModels;
using Giger.Services;
using System.Net.WebSockets;
using System.Text.Json;

namespace Giger.Connections.Handlers
{
    public class NotificationsSocketHandler(ConnectionsManager connections,
        //GigService gigService,        UserService userService, LogService logService,
        IServiceProvider serviceProvider) : SocketHandler(connections)
    {
        private readonly IServiceProvider _serviceProvider = serviceProvider;

        //private readonly GigService _gigService = gigService;
        //private readonly UserService _userService = userService;
        //private readonly LogService _logService = logService;

        public async Task NotifyAccount(string username, Account account) 
            => await NotifyPayload(username, new NotificationPayload() { AccountId = account.Id, AccountHash = account.GetHashCode()});

        public async Task NotifyTransaction(string username, Account account, Transaction transaction) 
            => await NotifyPayload(username, new NotificationPayload() { AccountId = account.Id, AccountHash = account.GetHashCode(), TransactionId = transaction.Id, TransactionHash = transaction.GetHashCode() });
        
        public async Task NotifyGigConversation(string username, Conversation gigConversation) 
            => await NotifyPayload(username, new NotificationPayload() { GigIdConversation = gigConversation.Id, GigConversationHash = gigConversation.GetHashCode() });
        
        public async Task NotifyGigStatus(string username, Gig gig) 
            => await NotifyPayload(username, new NotificationPayload() { GigIdStatus = gig.Id, GigStatusHash = CalculateGigStatusHash(gig)});
        
        public async Task NotifyConversationId(string username, Conversation conversation) 
            => await NotifyPayload(username, new NotificationPayload() { ConversationId = conversation.Id, ConversationHash = conversation.GetHashCode() });

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

        private int CalculateGigStatusHash(Gig gig)
        {
            return  41 + 43 * (int)gig.Status;
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
            using var scope = _serviceProvider.CreateScope();
            var gigService = scope.ServiceProvider.GetRequiredService<GigService>();
            var userService = scope.ServiceProvider.GetRequiredService<UserService>();

            var logService = scope.ServiceProvider.GetRequiredService<LogService>();
            var gig = await gigService.GetAsync(gigId);
            var taker = await userService.GetAsync(gig.TakenById);
            var author = await userService.GetAsync(gig.AuthorId);

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

            logService.CreateAsync(log);
        }
    }
}
