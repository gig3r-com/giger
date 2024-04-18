using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.MessageModels
{
    public class Conversation
    {
        [BsonId]
        [BsonElement("_id")]
        public string Id { get; set; }

        public Message[] Messages { get; set; } = [];

        public string[] Participants { get; set; } = []; // UserNames

        public bool GigConversation { get; set; }
    }
}
