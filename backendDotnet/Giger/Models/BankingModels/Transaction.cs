using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.BankingModels
{
    public class Transaction
    {
        [BsonId]
        public int Id { get; set; }
        
        public int To { get; set; }
        
        public int From { get; set; }
        
        public double Amount { get; set; }
        
        public DateTime Date { get; set; }
    }
}
