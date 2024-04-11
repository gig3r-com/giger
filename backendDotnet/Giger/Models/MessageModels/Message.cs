using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        public string Id { get; set; }
        
        public DateTime Date { get; set; }
        
        public string Sender { get; set; } // UserName
        
        public string Text { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public MessageStatus Status { get; set; }
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
