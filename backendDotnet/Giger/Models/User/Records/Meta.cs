using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.User.Records
{
    public class Meta : UserRecord
    {
        [BsonRepresentation(BsonType.String)]
        public required MetaTypes Type { get; set; }

        public bool IsLink { get; set; }

        public Meta()
        {
            RecordType = UserRecordTypes.META;
        }

        public override void Obscure()
        {
            base.Obscure();
            Type = MetaTypes.REDACTED;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 17 + Type.GetHashCode() * 5 + IsLink.GetHashCode() * 3;
        }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<MetaTypes>))]
    public enum MetaTypes
    {
        REDACTED,
        ARCHETYPE,
        MUSIC,
        INSPIRATIONS,
        AESTHETICS,
        PROCEDURE,
    }
}
