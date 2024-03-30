using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        [BsonId]
        public string Id { get; set; }
        
        public DateTime Date { get; set; }
        
        public string Sender { get; set; } // UserId
        
        public string Text { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public MessageStatus Status { get; set; }
    }
}
