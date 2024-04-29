using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Networks
{
    public class Network
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }
        public required string Name { get; set; }
        public string[] Subnetworks { get; set; } = [];
        public required string AdminId { get; set; }
    }
}
