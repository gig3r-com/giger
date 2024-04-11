using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Giger.Models.User.Records
{
    public class PrivateRecord : UserRecord
    {
        public required string Title { get; set; }

        [BsonRepresentation(BsonType.String)]
        UserRecordTypes RecordType = UserRecordTypes.PrivateRecord;

        override public void Obscure()
        {
            base.Obscure();
            Title = REDACTED;
        }
    }
}
