using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.MessageModels
{
    public class Conversation
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public List<Message> Messages { get; set; } = [];

        public required string[] Participants { get; set; } = []; // UserNames

        public required bool GigConversation { get; set; }
    }
}
