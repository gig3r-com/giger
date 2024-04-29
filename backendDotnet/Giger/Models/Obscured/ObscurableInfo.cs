using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using ThirdParty.Json.LitJson;

namespace Giger.Models.Obscured
{
    public abstract class ObscurableInfo
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public required bool IsRevealed { get; set; } = true;

        [BsonIgnore]
        protected const string REDACTED = "********REDACTED********";

        public virtual void Obscure() { } // nothing to obscure here
    }
}
