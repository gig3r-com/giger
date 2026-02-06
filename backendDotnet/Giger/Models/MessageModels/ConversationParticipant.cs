using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.MessageModels
{
    public class ConversationParticipant
    {
        public required string ConversationId { get; set; }
        [ForeignKey("ConversationId")]
        public Conversation? Conversation { get; set; }

        public required string UserHandle { get; set; }
    }
}
