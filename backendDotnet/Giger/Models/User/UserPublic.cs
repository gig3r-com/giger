
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Giger.Models.User
{
    public class UserPublic
    {
        public string? Id { get; set; }

        public string? Name { get; set; }

        public string Handle { get; set; } = string.Empty; // username

        public UserRoles[] Roles { get; set; } = [];

        [NotMapped]

        public Dictionary<string, decimal> AliasMap { get; set; } = [];

        public bool Active { get; set; }

        public UserTypes TypePublic { get; set; }

        public string? FactionRankPublic { get; set; } = string.Empty;

        public string? Surname { get; set; }

        public Vibe Vibe { get; set; }

        public WealthLevels WealthLevel { get; set; }

        public string NetworkId { get; set; }

        public string NetworkName { get; set; }

        public string SubnetworkId { get; set; }

        public string SubnetworkName { get; set; }

        public bool HasPlatinumPass { get; set; }

        public bool HighSecurity { get; set; }

        public string? ReputationDescription { get; set; } = string.Empty;
    }
}