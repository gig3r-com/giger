namespace Giger.Models.User.Records
{
    public class PrivateRecord : UserRecord
    {
        public PrivateRecord()
        {
            RecordType = UserRecordTypes.PrivateRecord;
        }

        override public void Obscure()
        {
            base.Obscure();
        }
    }
}