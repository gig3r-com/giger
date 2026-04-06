using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.BankingModels
{
    public class Transaction
    {
        [Key]
        public required string Id { get; set; }

        public string? From { get; set; } // accountNumber

        public string? To { get; set; } // accountNumber

        public required decimal Amount { get; set; }

        public DateTime? Timestamp { get; set; }

        public required string Title { get; set; }

        public string? OrderingUser { get; set; } // user handle

        public string? HackData { get; set; }

        // FK to Account (for navigation)
        public string? AccountId { get; set; }
        [ForeignKey("AccountId")]
        public Account? Account { get; set; }
    }
}
