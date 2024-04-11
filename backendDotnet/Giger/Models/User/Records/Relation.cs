namespace Giger.Models.User.Records
{
    public class Relation : UserRecord
    {
        public required string Title { get; set; }

        public Relation()
        {
            RecordType = UserRecordTypes.Relation;
        }

        public override void Obscure()
        {
            base.Obscure();
            Title = REDACTED;
        }
    }
}