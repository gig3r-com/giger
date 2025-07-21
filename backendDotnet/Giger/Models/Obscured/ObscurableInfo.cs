namespace Giger.Models.Obscured
{
    public abstract class ObscurableInfo
    {
        public required string Id { get; set; }

        public bool IsRevealed { get; set; } = true;

        protected const string REDACTED = "********REDACTED********";

        public virtual void Obscure() { } // nothing to obscure here

        public override int GetHashCode()
        {
            return Id.GetHashCode() * 19 + IsRevealed.GetHashCode() * 17;
        }
    }
}
