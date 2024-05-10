using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using static Giger.Models.User.Records.UserRecord;

namespace Giger.Models.User.Records
{
    public class Meta
    {
        [BsonId]
        [BsonElement("_id")]

        public string Id { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        [BsonRepresentation(BsonType.String)]
        public UserRecordTypes RecordType { get; set; } = UserRecordTypes.META;
    }
}
