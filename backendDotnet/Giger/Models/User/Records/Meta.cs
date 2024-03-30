using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.User.Records
{
    public class Meta : UserRecord
    {
        [BsonRepresentation(BsonType.String)]
        MetaTypes Type { get; set; }
        
        string Description { get; set; }
        
        bool IsLink { get; set; }

        [BsonRepresentation(BsonType.String)]
        UserRecordTypes RecordType = UserRecordTypes.Meta;
    }

    [JsonConverter(typeof(JsonStringEnumConverter<MetaTypes>))]
    public enum MetaTypes
    {
        Archetype,
        Music,
        Inspirations,
        Aesthetics,
        Procedure
    }
}
