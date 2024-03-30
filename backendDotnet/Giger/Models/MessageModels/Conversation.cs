using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.MessageModels
{
    public class Conversation
    {
        [BsonId]
        public string Id { get; set; }
        
        public Message[] Messages { get; set; } = [];

        public string[] Participants { get; set; } = [];

        public bool GigConversation { get; set; }
    }
}
