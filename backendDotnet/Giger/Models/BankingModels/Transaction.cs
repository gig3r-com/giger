using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Diagnostics.CodeAnalysis;

namespace Giger.Models.BankingModels
{
    public class Transaction
    {
        [BsonElement("_id")]
        public required string Id { get; set; }
        
        public required string From { get; set; }

        public required string To { get; set; }

        public required string Title { get; set; }

        [BsonIgnore]
        private decimal _amount;
        public required decimal Amount { get => _amount; set => _amount = Math.Abs(value); }

        public required DateTime Date { get; set; }

        public Transaction() { }

        [SetsRequiredMembers]
        public Transaction(string from, string to, string title, decimal amount)
        {
            Id = Guid.NewGuid().ToString();
            From = from;
            To = to;
            Title = title;
            Amount = amount;
            Date = GigerDateTime.Now;
        }
    }
}
