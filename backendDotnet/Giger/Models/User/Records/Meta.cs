using static Giger.Models.User.Records.UserRecord;

namespace Giger.Models.User.Records
{
    public class Meta
    {
        public string Id { get; set; } = string.Empty;

        public string? Title { get; set; }

        public string? Description { get; set; }

        public UserRecordTypes RecordType { get; set; } = UserRecordTypes.META;
    }
}
