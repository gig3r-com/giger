using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models
{
    public class GigerConfig
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public int MaxGigsPerUser { get; set; }

        public int GigFeePercentage { get; set; }

        public int ModeratorCommissionPercentage { get; set; }
    }
}
