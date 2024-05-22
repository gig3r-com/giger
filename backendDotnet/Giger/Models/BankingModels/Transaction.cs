using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Diagnostics.CodeAnalysis;

namespace Giger.Models.BankingModels
{
    public class Transaction
    {
        [BsonElement("_id")]
        public required string Id { get; set; }
        
        public string? From { get; set; } // AccountNumber

        public string? FromUser { get; set; } // Handle / Anonymized

        public string? To { get; set; } // AccountNumber

        public string? ToUser { get; set; } // Handle / Anonymized

        public string Title { get; set; }

        [BsonIgnore]
        private decimal _amount;
        public required decimal Amount { get => _amount; set => _amount = Math.Abs(value); }

        public required DateTime Timestamp { get; set; }

        public string? OrderingParty { get; set; } // user handle of person who ordered the transaction - only for business accounts

        public Transaction() { }

        [SetsRequiredMembers]
        public Transaction(string from, string to, string title, decimal amount)
        {
            Id = Guid.NewGuid().ToString();
            From = from;
            To = to;
            Title = title;
            Amount = amount;
            Timestamp = GigerDateTime.Now;
        }

        public override int GetHashCode()
        {
            int hash = 17;
            hash += 11 * Id.GetHashCode();
            hash += 13 * (From == null ? 1 : From.GetHashCode());
            hash += 13 * (FromUser == null ? 1 : FromUser.GetHashCode());
            hash += 17 * (To == null ? 1 : To.GetHashCode());
            hash += 17 * (ToUser == null ? 1 : ToUser.GetHashCode());
            hash += 19 * Title.GetHashCode();
            hash += 23 * Amount.GetHashCode();
            hash += 27 * Timestamp.GetHashCode();
            hash += 31 * (OrderingParty == null ? 1 : OrderingParty.GetHashCode());
            return hash;
        }
    }
}
