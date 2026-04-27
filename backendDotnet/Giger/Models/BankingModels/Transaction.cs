using System.Diagnostics.CodeAnalysis;

namespace Giger.Models.BankingModels
{
    public class Transaction
    {
        public required string Id { get; set; }
        
        public string From { get; set; } // AccountNumber

        public string To { get; set; } // AccountNumber

        private decimal _amount;
        public required decimal Amount { get => _amount; set => _amount = Math.Abs(value); }

        public DateTime? Timestamp { get; set; }

        public string Title { get; set; }

        public string? OrderingUser { get; set; } // user handle of person who ordered the transaction - only for business accounts

        public string? HackData { get; set; } // used to store hack related data for hacked transactions

        public Transaction() { }

        [SetsRequiredMembers]
        public Transaction(Transaction transaction)
        {
            Id = transaction.Id;
            From = transaction.From;
            To = transaction.To;
            Title = transaction.Title;
            Amount = transaction.Amount;
            Timestamp = transaction.Timestamp ?? GigerDateTime.Now;
            OrderingUser = transaction.OrderingUser;
            HackData = transaction.HackData;
        }

        public override int GetHashCode()
        {
            int hash = 17;
            hash += 11 * Id.GetHashCode();
            hash += 13 * From.GetHashCode();
            hash += 17 * To.GetHashCode();
            hash += 19 * Title.GetHashCode();
            hash += 23 * Amount.GetHashCode();
            hash += 27 * Timestamp.GetHashCode();
            hash += 31 * (OrderingUser == null ? 1 : OrderingUser.GetHashCode());
            return hash;
        }
    }
}
