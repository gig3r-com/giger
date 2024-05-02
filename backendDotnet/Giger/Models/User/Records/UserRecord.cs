using Giger.Models.Obscured;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.User.Records
{
    public abstract class UserRecord : ObscurableInfo
    {
        public required string Title { get; set; }
        
        public required string Description { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public UserRecordTypes RecordType { get; set; }

        public override void Obscure()
        {
            Title = REDACTED;
            Description = REDACTED;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 7 + Title.GetHashCode() * 13 + Description.GetHashCode() * 11 + RecordType.GetHashCode() * 7;
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
}