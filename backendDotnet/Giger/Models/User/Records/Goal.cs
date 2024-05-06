namespace Giger.Models.User.Records
{
    public class Goal : UserRecord
    {
        public required string Title { get; set; }

        public Goal()
        {
            RecordType = UserRecordTypes.GOAL;
        }

        public override void Obscure()
        {
            base.Obscure();
            Title = REDACTED;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 37 + Title.GetHashCode() * 13;
        }
    }
}
