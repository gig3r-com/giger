using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Obscured
{
    public class ObscuredCodesMap
    {
        [BsonId]
        public required string Id { get; set; }

        public required string ObscurableId { get; set; }

        public required string ExpectedRevealCode { get; set; }

        public bool IsUsed { get; set; } = false;
    }
}
