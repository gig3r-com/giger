using MongoDB.Bson.Serialization.Attributes;
using Giger.Models.UserModels;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        [BsonId]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Sender { get; set; } // UserId
        public string Text { get; set; }
        public MessageStatus Status { get; set; }
    }
}
