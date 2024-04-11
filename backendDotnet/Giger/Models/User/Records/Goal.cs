namespace Giger.Models.User.Records
{
    public class Goal : UserRecord
    {
        public required string Title { get; set; }

        public Goal()
        {
            RecordType = UserRecordTypes.Goal;
        }

        public override void Obscure()
        {
            base.Obscure();
            Title = REDACTED;
        }
    }
}
