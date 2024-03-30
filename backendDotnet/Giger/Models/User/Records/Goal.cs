using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Giger.Models.User.Records
{
    public class Goal : UserRecord
    {
        public string Title { get; set; }

        [BsonRepresentation(BsonType.String)]
        public UserRecordTypes RecordType  => UserRecordTypes.Goal;
    }
}
