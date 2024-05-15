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

        public List<Transaction> Transactions { get; set; } = [];
        
        [BsonRepresentation(BsonType.String)]
        public required AccountType Type { get; set; }

        public required decimal Balance { get; set; }
        
        public required string AccountNumber { get; set; }

        public bool IsActive { get; set; }

        public override int GetHashCode()
        {
            int hash = 19;
            hash *= 3 * Id.GetHashCode();
            foreach (var trx in Transactions)
            {
                hash *= 5 * trx.GetHashCode();
            }
            hash *= 7 * Type.GetHashCode();
            hash *= 11 * Balance.GetHashCode();
            hash *= 13 * IsActive.GetHashCode();

            return hash;
        }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<AccountType>))]
    public enum AccountType
    {
        PRIVATE,
        BUSINESS
    }
}
