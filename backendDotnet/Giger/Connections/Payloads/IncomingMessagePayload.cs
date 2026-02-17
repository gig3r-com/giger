namespace Giger.Connections.Payloads
{
    public class IncomingMessagePayload
    {
        public string ConversationId { get; set; } = "";
        public bool IsGigConveration { get; set; }
        public IncomingMessageDTO Message { get; set; } = new();
    }

    public class IncomingMessageDTO
    {
        public string Id { get; set; } = "";
        public string Date { get; set; } = "";
        public string Sender { get; set; } = "";
        public string Text { get; set; } = "";
    }
}
