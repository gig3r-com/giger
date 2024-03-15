using Giger.Models.EventModels;

namespace Giger.Models.User.Records
{
    public class UserRecord : ObscurableInfo
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
        public UserRecordTypes RecordType { get; set; }
    }
    
    public enum UserRecordTypes
    {
        Relation,
        Goal,
        Meta,
        PrivateRecord
    }
}
