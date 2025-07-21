
namespace Giger.Models.User
{
    public class UserPublic
    {
        public required string Id { get; set; }

        public string? Name { get; set; }

        public required string Handle { get; set; } // username

        public UserRoles[] Roles { get; set; } = [];

        public Dictionary<string, decimal> AliasMap { get; set; } = [];

        public bool Active { get; set; }

        public required UserTypes TypePublic { get; set; }

        public string? FactionRankPublic { get; set; }

        public required string Surname { get; set; }

        public required Vibe Vibe { get; set; }

        public required WealthLevels WealthLevel { get; set; }

        public string NetworkId { get; set; }

        public string NetworkName { get; set; }

        public string SubnetworkId { get; set; }

        public string SubnetworkName { get; set; }

        public bool HasPlatinumPass { get; set; }

        public bool HighSecurity { get; set; }

        public string? ReputationDescription { get; set; }
    }
}