using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Networks
{
    public class Network
    {
        [BsonId]
        public string Id { get; set; }
        public string Name { get; set; }
        public string[] Subnetworks { get; set; } = [];
        public string AdminId { get; set; }
    }
}
