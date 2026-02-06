using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.User
{
    public class User
    {
        [Key]
        public required string Id { get; set; }

        public string[] Roles { get; set; } = [];

        public required string Handle { get; set; }

        public string? Summary { get; set; }

        public bool Active { get; set; }

        public string? Name { get; set; }

        public required string Surname { get; set; }

        public string? Faction { get; set; }

        public string? FactionRankPublic { get; set; }

        public string? FactionRankActual { get; set; }

        public string? SpeciesPublic { get; set; }

        public string? SpeciesActual { get; set; }

        public string? Vibe { get; set; }

        public int VibeLevel { get; set; }

        public string? VibeEngagement { get; set; }

        public string? VibeFunction { get; set; }

        public string? VibeOpinions { get; set; }

        public int ConfrontationistVsAgreeable { get; set; }

        public int CowardVsBrave { get; set; }

        public int TalkativeVsSilent { get; set; }

        public int ThinkerVsDoer { get; set; }

        public string? Affiliation { get; set; }

        public string? Profession { get; set; }

        public string? Wealth { get; set; }

        public int CyberwareLevel { get; set; }

        public string? Network { get; set; } // network name

        public string? NetworkAdmin { get; set; }

        public string? Subnetwork { get; set; } // subnetwork name

        public int CombatSkill { get; set; }

        public int HackerSkill { get; set; }

        public string? MainAccount { get; set; } // accountNumber

        [Column(TypeName = "jsonb")]
        public Dictionary<string, decimal> GigReputation { get; set; } = new();

        public int PersonalIce { get; set; }

        public string? HackerName { get; set; }

        public string[] Exploits { get; set; } = [];

        public string? EpsilonNotes { get; set; }

        public string? EpsilonBankingNotes { get; set; }

        public string? EpsilonConversationNotes { get; set; }

        public string? EpsilonPlots { get; set; }

        [Column(TypeName = "jsonb")]
        public Dictionary<string, string> EpsilonData { get; set; } = new();

        // Navigation
        public List<UserFavoriteUser> FavoriteUsers { get; set; } = [];
        public List<RecordType> Records { get; set; } = [];
        public List<UserEpsilonConversationNote> EpsilonConversationsNotes { get; set; } = [];
    }
}
