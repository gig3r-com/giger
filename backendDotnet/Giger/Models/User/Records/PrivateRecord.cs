namespace Giger.Models.User.Records
{
    public class PrivateRecord : UserRecord
    {
        public string Title { get; set; } = string.Empty;

        public PrivateRecord()
        {
            RecordType = UserRecordTypes.PRIVATE_RECORD;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 23 + Title.GetHashCode() * 13;
        }

        override public void Obscure()
        {
            base.Obscure();
            Title = REDACTED;
        }
    }
}