using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.MessageModels
{
    public class MessageReadBy
    {
        public required string MessageId { get; set; }
        [ForeignKey("MessageId")]
        public Message? Message { get; set; }

        public required string UserHandle { get; set; }
    }
}
