using static Giger.Models.User.Records.UserRecord;

namespace Giger.Models.User.Records
{
    public class Meta
    {
        public required string Id { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public UserRecordTypes RecordType { get; set; } = UserRecordTypes.META;
    }
}
