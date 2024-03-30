using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.BankingModels
{
    public class Transaction
    {
        [BsonId]
        public string Id { get; set; }
        
        public string To { get; set; }
        
        public string From { get; set; }
        
        public double Amount { get; set; }
        
        public DateTime Date { get; set; }
    }
}
