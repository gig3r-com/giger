namespace Giger.DTOs
{
    public class CreateConversationRequest
    {
        public string? Id { get; set; }
        public bool GigConversation { get; set; }
        public List<string> Participants { get; set; } = new();
        public List<string> AnonymizedUsers { get; set; } = new();
        public List<CreateMessageRequest>? Messages { get; set; } = new();
    }

    public class CreateMessageRequest
    {
        public string? Id { get; set; }
        public string Date { get; set; } = "";
        public string Sender { get; set; } = "";
        public string Text { get; set; } = "";
    }
}
