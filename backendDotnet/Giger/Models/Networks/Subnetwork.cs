using System.Text.Json.Serialization;

namespace Giger.Models.Networks
{
    public class Subnetwork
    {
        [JsonPropertyName("_id")]

        public string Id { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public string NetworkId { get; set; } = string.Empty;

        public string[] Users { get; set; } = [];

        public Firewall? Firewall { get; set; }
        
        public OperatingSystem? OperatingSystem { get; set; }

        public string[] Ice { get; set; } = [];

        public string[] PastHacks { get; set; } = [];
    }

    [JsonConverter(typeof(JsonStringEnumConverter<Firewall>))]
    public enum Firewall
    {
        ENCRYPT_GUARD,
        FIREWALL_X,
        VIRTUAL_VAULT
    }

    [JsonConverter(typeof(JsonStringEnumConverter<OperatingSystem>))]
    public enum OperatingSystem
    {
        FORCE_FIELD,
        EVIL_TWIN,
        JOAN_OF_ARC
    }
}
