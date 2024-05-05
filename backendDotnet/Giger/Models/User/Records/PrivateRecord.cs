namespace Giger.Models.User.Records
{
    public class PrivateRecord : UserRecord
    {
        public PrivateRecord()
        {
            RecordType = UserRecordTypes.PRIVATE_RECORD;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 23;
        }

        override public void Obscure()
        {
            base.Obscure();
        }
    }
}