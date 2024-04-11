using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Giger.Models.Obscured
{
    public abstract class ObscurableInfo
    {
        [BsonId]
        public required string Id { get; set; }

        public required int RevealPriority { get; set; }

        public required bool IsRevealed { get; set; }

        [BsonIgnore]
        protected const string REDACTED = "********REDACTED********";

        public virtual void Obscure() { } // nothing to obscure here
    }
}
