using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.User
{
    public class RecordType
    {
        [Key]
        public required string Id { get; set; }

        public required string UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }

        public required string RecordGroup { get; set; } // hard, offgame, mind

        public required string Type { get; set; }

        public string? Category { get; set; }

        public string? SubCategory { get; set; }

        public string? Title { get; set; }

        public string? Data { get; set; }

        public DateTime? Timestamp { get; set; }

        public bool IsRevealed { get; set; }

        public string? RevealCode { get; set; }

        public bool IsEncrypted { get; set; }

        public string? EncryptionCode { get; set; }

        public string? HackData { get; set; }
    }
}
