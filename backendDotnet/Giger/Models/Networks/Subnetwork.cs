using Giger.Models.Logs;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Giger.Models.Networks
{
    public class Subnetwork
    {
        public required string Id { get; set; }

        public required string Name { get; set; }

        public required string Network { get; set; }

        public required string[] Users { get; set; } = [];

        public string Firewall { get; set; }
        
        public string OperatingSystem { get; set; }

        public string[] Ice { get; set; } = [];

        public string AccessPoint { get; set; }

        public string[] PastHacks { get; set; } = [];

        [NotMapped]
        public Log[] Logs { get; set; } = [];
    }

    //public enum Firewall
    //{
    //    ENCRYPT_GUARD,
    //    FIREWALL_X,
    //    VIRTUAL_VAULT
    //}

    //public enum OperatingSystem
    //{
    //    FORCE_FIELD,
    //    EVIL_TWIN,
    //    JOAN_OF_ARC
    //}
}
