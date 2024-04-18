using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        public required string Id { get; set; }

        public required DateTime Date { get; set; }

        public required string Sender { get; set; } // UserName

        public required string Text { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public required MessageStatus Status { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<MessageStatus>))]
    public enum MessageStatus
    {
        SENT,
        RECEIVED,
        READ,
        ERROR,
        AWAITING,
    }
}
