namespace Giger.Connections.Payloads
{
    public class NotificationPayload
    {
        public string AccountId { get; set; }
        public int AccountHash { get; set; }

        public string TransactionId { get; set; }
        public int TransactionHash { get; set; }

        public string GigIdConversation { get; set; }
        public int GigConversationHash { get; set; }

        public string GigIdStatus { get; set; }
        public int GigStatusHash { get; set; }

        public string ConversationId { get; set; }
        public int ConversationHash { get; set; }

        public bool UpdateRequired { get; set; }
    }
}
