using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.BankingModels
{
    public class Account
    {
        [Key]
        public required string Id { get; set; }

        public required string Type { get; set; } // PRIVATE, BUSINESS

        public string? Name { get; set; }

        public required string AccountNumber { get; set; }

        public required decimal Balance { get; set; }

        // Navigation: owners via junction table
        public List<AccountOwner> Owners { get; set; } = [];

        public List<Transaction> Transactions { get; set; } = [];
    }
}
