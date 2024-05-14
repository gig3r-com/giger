using Giger.Models.BankingModels;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Giger.Connections.Payloads
{
    public class TransactionPayload
    {
        [BsonRepresentation(BsonType.String)]
        SocketMessageType MessageType = SocketMessageType.NEW_TRANSACTION;

        public Transaction Transaction { get; set; }

        public string AccountId { get; set; }
    }
}
