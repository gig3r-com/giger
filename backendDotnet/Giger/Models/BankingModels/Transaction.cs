using Giger.Models.UserModels;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.BankingModels
{
    public class Transaction
    {
        [BsonId]
        public int Id { get; set; }
        public User To { get; set; }
        public User From { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
