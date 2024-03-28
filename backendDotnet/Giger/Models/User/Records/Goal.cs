namespace Giger.Models.User.Records
{
    public class Goal : UserRecord
    {
        public string Title { get; set; }
        public UserRecordTypes RecordType  => UserRecordTypes.Goal;
    }
}
