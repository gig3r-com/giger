namespace Giger.Models.User.Records
{
    public class Relation : UserRecord
    {
        public required string UserId { get; set; }

        public Relation()
        {
            RecordType = UserRecordTypes.Relation;
        }

        public override void Obscure()
        {
            UserId = REDACTED;
            base.Obscure();
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() * 27 + UserId.GetHashCode() * 31;
        }
    }
}