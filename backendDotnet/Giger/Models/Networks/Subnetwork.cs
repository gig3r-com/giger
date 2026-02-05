using System.ComponentModel.DataAnnotations;

namespace Giger.Models.Networks
{
    public class Subnetwork
    {
        [Key]
        public required string Id { get; set; }

        public required string Name { get; set; }

        public required string Network { get; set; } // network name

        public string? Firewall { get; set; }

        public string? OperatingSystem { get; set; }

        public string[] Ice { get; set; } = [];

        public string? AccessPoint { get; set; }

        public string[] PastHacks { get; set; } = [];

        // Navigation: users via junction
        public List<SubnetworkUser> Users { get; set; } = [];
    }
}
