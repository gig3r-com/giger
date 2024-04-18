using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Networks
{
    public class Network
    {
        [BsonId]
        [BsonElement("_id")]
        public string Id { get; set; }
        public string Name { get; set; }
        public string[] Subnetworks { get; set; } = [];
        public string AdminId { get; set; }
    }
}
