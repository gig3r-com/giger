using Giger.Models.Logs;
using System.Text.Json.Serialization;

namespace Giger.Models.Networks
{
    public class Subnetwork
    {
        public string Id { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public string NetworkId { get; set; } = string.Empty;

        public string[] Users { get; set; } = [];

        public Firewall? Firewall { get; set; }
        
        public OperatingSystem? OperatingSystem { get; set; }

        public string[] Ice { get; set; } = [];

        /// <summary>
        /// Optional access point identifier for this subnetwork
        /// </summary>
        public string? AccessPoint { get; set; }

        public string[] PastHacks { get; set; } = [];

        /// <summary>
        /// Collection of logs associated with this subnetwork
        /// </summary>
        public List<Log>? Logs { get; set; }
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
