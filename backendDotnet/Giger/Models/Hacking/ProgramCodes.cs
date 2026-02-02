using System.Text.Json.Serialization;

namespace Giger.Models.Hacking
{
    public class ProgramCodes
    {
        [JsonPropertyName("_id")]

        public string Id { get; set; } = string.Empty;

        public string ProgramCode { get; set; } = string.Empty;

        public bool IsUsed { get; set; }
    }
}
