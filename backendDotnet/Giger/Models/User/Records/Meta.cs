using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.User.Records
{
    public class Meta : UserRecord
    {
        [BsonRepresentation(BsonType.String)]
        public MetaTypes Type { get; set; }

        public bool IsLink { get; set; }

        public Meta()
        {
            RecordType = UserRecordTypes.Meta;
        }

        public override void Obscure()
        {
            base.Obscure();
            Type = MetaTypes.REDACTED;
        }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<MetaTypes>))]
    public enum MetaTypes
    {
        REDACTED,
        Archetype,
        Music,
        Inspirations,
        Aesthetics,
        Procedure,
    }
}
