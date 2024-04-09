using Giger.Models.Obscured;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.User.Records
{
    public class UserRecord : ObscurableInfo
    {
        public string UserId { get; set; }
        
        public string Description { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public UserRecordTypes RecordType { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<UserRecordTypes>))]
    public enum UserRecordTypes
    {
        Relation,
        Goal,
        Meta,
        PrivateRecord
    }
}
