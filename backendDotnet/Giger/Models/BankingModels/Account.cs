using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.BankingModels
{
    public class Account
    {
        [BsonId]
        public string Id { get; set; }
        
        public string Owner { get; set; }

        public Transaction[] Transactions { get; set; } = [];
        
        [BsonRepresentation(BsonType.String)]
        public AccountType Type { get; set; }
        
        public decimal Balance { get; set; }
        
        public string AccountNumber { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<AccountType>))]
    public enum AccountType
    {
        PRIVATE,
        BUSINESS
    }
}
