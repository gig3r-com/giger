using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.BankingModels
{
    public class Account
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public required string Owner { get; set; }

        public required string OwnerId { get; set; }

        public Transaction[] Transactions { get; set; } = [];
        
        [BsonRepresentation(BsonType.String)]
        public required AccountType Type { get; set; }

        public required decimal Balance { get; set; }
        
        public required string AccountNumber { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<AccountType>))]
    public enum AccountType
    {
        PRIVATE,
        BUSINESS
    }
}
