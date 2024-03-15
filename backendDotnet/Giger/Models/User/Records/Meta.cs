namespace Giger.Models.User.Records
{
    public class Meta : UserRecord
    {
        MetaTypes Type { get; set; }
        string Description { get; set; }
        bool IsLink { get; set; }

        UserRecordTypes RecordType = UserRecordTypes.Meta;
    }

    public enum MetaTypes
    {
        Archetype,
        Music,
        Inspirations,
        Aesthetics,
        Procedure
    }
}
