using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        [BsonElement("_id")]
        public required string Id { get; set; }

        public required DateTime Date { get; set; }

        public required string Sender { get; set; } // UserName

        public required string Text { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public required MessageStatus Status { get; set; }

        public Message() { }

        [SetsRequiredMembers]
        public Message(string sender, string text)
        {
            Id = Guid.NewGuid().ToString();
            Date = GigerDateTime.Now;
            Sender = sender;
            Text = text;
            Status = MessageStatus.SENT;
        }

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
