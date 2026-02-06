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
            return gig.Status?.GetHashCode() ?? 0;
        }


        private async Task NotifyPayload(string username, NotificationPayload payload)
        {
            try
            {
                var message = JsonSerializer.Serialize(payload);
                await SendMessageAsync(username, message);
                if (payload.GigIdStatus != null)
                {
                    _ = LogGigStatusChangedAsync(payload.GigIdStatus);
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

        private async Task LogGigStatusChangedAsync(string gigId)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var gigService = scope.ServiceProvider.GetRequiredService<GigService>();
                var userService = scope.ServiceProvider.GetRequiredService<UserService>();
                var logService = scope.ServiceProvider.GetRequiredService<LogService>();

                var gig = await gigService.GetAsync(gigId);
                if (gig is null) return;

                var taker = gig.WorkerId != null ? await userService.GetAsync(gig.WorkerId) : null;
                var author = await userService.GetAsync(gig.AuthorId);

                var authorHandle = gig.IsAnonymizedAuthor ? Gig.ANONIMIZED : gig.AuthorHandle;
                string sourceUser, targetUser, subnetwork;
                string logType;
                switch (gig.Status)
                {
                    case "AVAILABLE":
                        sourceUser = authorHandle;
                        subnetwork = author?.Subnetwork;
                        targetUser = null;
                        logType = "GIG_CREATED";
                        break;
                    case "IN_PROGRESS":
                        sourceUser = taker?.Handle;
                        subnetwork = taker?.Subnetwork;
                        targetUser = authorHandle;
                        logType = "GIG_ACCEPTED";
                        break;
                    case "PENDING_CONFIRMATION":
                        if (gig.Mode == "authorWantsToBeHired")
                        {
                            sourceUser = authorHandle;
                            subnetwork = author?.Subnetwork;
                            targetUser = taker?.Handle;
                        }
                        else
                        {
                            sourceUser = taker?.Handle;
                            subnetwork = taker?.Subnetwork;
                            targetUser = authorHandle;
                        }
                        logType = "GIG_UPDATED";
                        break;
                    case "DISPUTE":
                    case "COMPLETED":
                        if (gig.Mode == "authorIsHiring")
                        {
                            sourceUser = authorHandle;
                            subnetwork = author?.Subnetwork;
                            targetUser = taker?.Handle;
                        }
                        else
                        {
                            sourceUser = taker?.Handle;
                            subnetwork = taker?.Subnetwork;
                            targetUser = authorHandle;
                        }
                        logType = "GIG_UPDATED";
                        break;
                    default:
                        return;
                }

                var log = new Log()
                {
                    Id = Guid.NewGuid().ToString(),
                    Timestamp = GigerDateTime.Now,
                    SourceUser = sourceUser,
                    TargetUser = targetUser,
                    LogType = logType,
                    LogData = $"Gig {gig.Title} status has been changed to '{gig.Status}' by {sourceUser}.",
                    Subnetwork = subnetwork,
                };

                await logService.CreateAsync(log);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[LogGigStatusChanged] Error logging gig status: {ex.Message}");
            }
        }
    }
}
