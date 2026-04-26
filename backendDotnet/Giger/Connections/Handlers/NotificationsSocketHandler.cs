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
    public class NotificationsSocketHandler(ConnectionsManager connections, IServiceProvider _serviceProvider) : SocketHandler(connections)
    {
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
            return  41 + 43 * gig.Status.GetHashCode();
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
            var gigService = ScopedServiceProvider.CreateScopedGigerService<GigService>(_serviceProvider);
            var userService = ScopedServiceProvider.CreateScopedGigerService<UserService>(_serviceProvider);
            var logService = ScopedServiceProvider.CreateScopedGigerService<LogService>(_serviceProvider);

            var gig = await gigService.GetAsync(gigId);
            var taker = await userService.GetAsync(gig.WorkerId);
            var author = await userService.GetAsync(gig.AuthorId);

            var authorName = gig.IsAnonymizedAuthor ? Gig.ANONYMIZED_USER : gig.AuthorHandle;
            string sourceName, targetName, subnetworkName, logType;
            switch (gig.Status)
            {
                case Gig.AVAILABLE:
                    sourceName = authorName;
                    subnetworkName = author.Subnetwork;
                    targetName = null;
                    logType = LogType.GIG_CREATED.ToString();
                    break;
                case Gig.IN_PROGRESS:
                    sourceName = taker.Handle;
                    subnetworkName = taker.Subnetwork;
                    targetName = authorName;
                    logType = LogType.GIG_ACCEPTED.ToString();
                    break;
                case Gig.PENDING_CONFIRMATION:
                    if (gig.Mode == Gig.MODE_PROVIDER)
                    {
                        sourceName = authorName;
                        subnetworkName = author.Subnetwork;
                        targetName = taker.Handle;
                    }
                    else
                    {
                        sourceName = taker.Handle;
                        subnetworkName = taker.Subnetwork;
                        targetName = authorName;
                    }
                    logType = LogType.GIG_UPDATED.ToString();
                    break;
                case Gig.DISPUTE:
                case Gig.COMPLETED:
                    if (gig.Mode == Gig.MODE_CLIENT)
                    {
                        sourceName = authorName;
                        subnetworkName = author.Subnetwork;
                        targetName = taker.Handle;
                    }
                    else
                    {
                        sourceName = taker.Handle;
                        subnetworkName = taker.Subnetwork;
                        targetName = authorName;
                    }
                    logType = LogType.GIG_UPDATED.ToString();
                    break;
                default:
                    return;
            }

            var log = new Log()
            {
                Id = Guid.NewGuid().ToString(),
                Timestamp = GigerDateTime.Now,
                SourceUser = sourceName,
                TargetUser = targetName,
                LogType = logType,
                LogData = $"Gig {gig.Title} status has been changed to '{gig.Status}' by {sourceName}.",
                Subnetwork = subnetworkName,
            };

            logService.CreateAsync(log);
        }
    }
}
