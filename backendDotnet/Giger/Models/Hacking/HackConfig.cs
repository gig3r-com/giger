using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Hacking
{
    public class HackConfig
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }
        
        public required string Config { get; set; }

    }
}
