using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        [BsonId]
        public int Id { get; set; }
        
        public DateTime Date { get; set; }
        
        public int Sender { get; set; } // UserId
        
        public string Text { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public MessageStatus Status { get; set; }
    }
}
