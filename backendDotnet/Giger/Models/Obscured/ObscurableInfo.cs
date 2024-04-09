using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Obscured
{
    public abstract class ObscurableInfo
    {
        [BsonId]
        public required string Id { get; set; }

        public required bool RevealPriority { get; set; }

        public required int IsRevealed { get; set; }
    }
}
