namespace Giger.Models.User.Records
{
    public class Relation : UserRecord
    {
        public string UserName { get; set; } = string.Empty;

        public Relation()
        {
            RecordType = UserRecordTypes.RELATION;
        }

        public override void Obscure()
        {
            base.Obscure();
            UserName = REDACTED;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 27 + UserName.GetHashCode() * 31;
        }
    }
}