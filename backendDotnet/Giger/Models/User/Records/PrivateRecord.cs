namespace Giger.Models.User.Records
{
    public class PrivateRecord : UserRecord
    {
        public required string Title { get; set; }

        public PrivateRecord()
        {
            RecordType = UserRecordTypes.PrivateRecord;
        }

        override public void Obscure()
        {
            base.Obscure();
            Title = REDACTED;
        }
    }
}