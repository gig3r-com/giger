using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.User
{
    public class UserEpsilonConversationNote
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public required string UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }

        public string[] Participants { get; set; } = [];

        public required string Notes { get; set; }
    }
}
