using System.Text.Json.Serialization;

namespace Giger.Models
{
    public class GigerConfig
    {
        [JsonPropertyName("_id")]

        public string Id { get; set; } = string.Empty;

        public int MaxGigsPerUser { get; set; }

        public int GigFeePercentage { get; set; }

        public int ModeratorCommissionPercentage { get; set; }
    }
}
