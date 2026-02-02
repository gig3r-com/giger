using System.Text.Json.Serialization;

namespace Giger.Models.Obscured
{
    public class ObscuredCodesMap
    {
        [JsonPropertyName("_id")]

        public string Id { get; set; } = string.Empty;

        public string ObscurableId { get; set; } = string.Empty;

        public string? ExpectedRevealCode { get; set; }

        public string? Username { get; set; }

        public bool IsUsed { get; set; } = false;
    }
}
