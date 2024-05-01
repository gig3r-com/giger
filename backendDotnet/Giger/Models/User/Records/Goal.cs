namespace Giger.Models.User.Records
{
    public class Goal : UserRecord
    {
        public Goal()
        {
            RecordType = UserRecordTypes.Goal;
        }

        public override void Obscure()
        {
            base.Obscure();
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 37;
        }
    }
}
