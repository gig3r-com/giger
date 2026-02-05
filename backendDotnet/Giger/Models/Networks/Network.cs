using System.Text.Json.Serialization;

namespace Giger.Models.Networks
{
    public class Network
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string[] Subnetworks { get; set; } = [];
        public string? AdminId { get; set; }

        /// <summary>
        /// Handle of the network administrator
        /// </summary>
        public string? Admin { get; set; }

        /// <summary>
        /// Network nodes stored as key-value pairs
        /// </summary>
        public Dictionary<string, string>? Nodes { get; set; }

        /// <summary>
        /// Network data stored as key-value pairs
        /// </summary>
        public Dictionary<string, string>? Data { get; set; }

        /// <summary>
        /// Description used by Epsilon system
        /// </summary>
        public string? EpsilonDescription { get; set; }
    }
}
