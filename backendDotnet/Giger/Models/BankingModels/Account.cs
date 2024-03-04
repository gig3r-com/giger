using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.BankingModels
{
    public class Account
    {
        [BsonId]
        public int Id { get; set; }
        public int Owner { get; set; }
        public Transaction[] Transactions { get; set; }
        public AccountType Type { get; set; }
        public decimal Balance { get; set; }
        public string AccountNumber { get; set; }
    }

    public enum AccountType
    {
        PRIVATE,
        BUSINESS
    }
}
