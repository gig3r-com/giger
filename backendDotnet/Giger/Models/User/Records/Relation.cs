using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User.Records
{
    public class Relation : UserRecord
    {
        public string Title { get; set; }

        [BsonRepresentation(BsonType.String)]
        public UserRecordTypes RecordType => UserRecordTypes.Relation;
    }
}
