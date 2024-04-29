using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.BankingModels
{
    public class Transaction
    {
        public required string Id { get; set; }
        
        public required string To { get; set; }
        
        public required string From { get; set; }

        public required string Title { get; set; }

        [BsonIgnore]
        private decimal _amount;
        public required decimal Amount { get => _amount; set => _amount = Math.Abs(value); }

        public required DateTime Date { get; set; }
    }
}
