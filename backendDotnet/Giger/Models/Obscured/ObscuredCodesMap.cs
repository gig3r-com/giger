namespace Giger.Models.Obscured
{
    public class ObscuredCodesMap
    {
        public string Id { get; set; } = string.Empty;

        public string ObscurableId { get; set; } = string.Empty;

        public string ExpectedRevealCode { get; set; } = string.Empty;

        public string? Username { get; set; }

        public bool IsUsed { get; set; } = false;
    }
}
