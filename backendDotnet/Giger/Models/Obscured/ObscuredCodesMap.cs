namespace Giger.Models.Obscured
{
    public class ObscuredCodesMap
    {
        public required string Id { get; set; }

        public required string ObscurableId { get; set; }

        public required string ExpectedRevealCode { get; set; }

        public string? Username { get; set; }

        public bool IsUsed { get; set; } = false;
    }
}
