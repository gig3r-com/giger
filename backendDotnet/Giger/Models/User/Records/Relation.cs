namespace Giger.Models.User.Records
{
    public class Relation : UserRecord
    {
        public string Title { get; set; }
        public UserRecordTypes RecordType => UserRecordTypes.Relation;
    }
}
