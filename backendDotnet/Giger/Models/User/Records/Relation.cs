namespace Giger.Models.User.Records
{
    public class Relation : UserRecord
    {
        public required string UserName { get; set; }

        public Relation()
        {
            RecordType = UserRecordTypes.RELATION;
        }

        public override void Obscure()
        {
            UserName = REDACTED;
            base.Obscure();
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 27 + UserName.GetHashCode() * 31;
        }
    }
}