using Giger.Models.Obscured;
using System.Text.Json.Serialization;

namespace Giger.Models.User.Records
{
    public abstract class UserRecord : ObscurableInfo
    {
        public required string Description { get; set; }
        
        public UserRecordTypes RecordType { get; set; }

        public override void Obscure()
        {
            Description = REDACTED;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 7 + Description.GetHashCode() * 11 + RecordType.GetHashCode() * 7;
        }

        [JsonConverter(typeof(JsonStringEnumConverter<UserRecordTypes>))]
        public enum UserRecordTypes
        {
            RELATION,
            GOAL,
            META,
            PRIVATE_RECORD
        }
    }
}