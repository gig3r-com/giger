using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        [Key]
        public required string Id { get; set; }

        public required string ConversationId { get; set; }
        [ForeignKey("ConversationId")]
        public Conversation? Conversation { get; set; }

        public required DateTime Timestamp { get; set; }

        public required string Sender { get; set; } // user handle

        public required string Type { get; set; }

        public required string Data { get; set; }

        public string? Hacker { get; set; } // user handle

        public string? EpsilonNote { get; set; }

        // Navigation: readBy via junction
        public List<MessageReadBy> ReadBy { get; set; } = [];
    }
}
