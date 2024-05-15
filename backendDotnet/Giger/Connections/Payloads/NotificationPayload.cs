namespace Giger.Connections.Payloads
{
    public class NotificationPayload
    {
        public string AccountId { get; set; }

        public string TransactionId { get; set; }

        public string GigIdConversation { get; set; }

        public string GigIdStatus { get; set; }

        public string ConversationId { get; set; }

        public bool UpdateRequired { get; set; }
    }
}
