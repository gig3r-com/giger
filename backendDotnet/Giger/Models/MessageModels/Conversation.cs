using System.ComponentModel.DataAnnotations;

namespace Giger.Models.MessageModels
{
    public class Conversation
    {
        [Key]
        public required string Id { get; set; }

        public string? Title { get; set; }

        public required bool GigConversation { get; set; }

        // Navigation
        public List<Message> Messages { get; set; } = [];
        public List<ConversationParticipant> Participants { get; set; } = [];
        public List<ConversationAnonymizedUser> AnonymizedUsers { get; set; } = [];
        public List<ConversationHacker> Hackers { get; set; } = [];
    }
}
