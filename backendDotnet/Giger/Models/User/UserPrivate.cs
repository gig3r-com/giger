using Giger.Models.EventModels;
using Giger.Models.PlotModels;
using Giger.Models.User.Records;
using Giger.Models.User.Stats;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.User
{
    public class UserPrivate : UserPublic
    {
        public CyberwareLevel CyberwareLevel { get; set; }

        public UserTypes TypeActual { get; set; }

        public string? FactionRankActual { get; set; }
        
        public string[] Assets { get; set; } = []; //TODO: DELETE?

        public SkillStat HackingSkills { get; set; }

        public CharStat ConfrontationistVsAgreeable { get; set; }

        public CharStat CowardVsBrave { get; set; }

        public CharStat TalkativeVsSilent { get; set; }

        public CharStat ThinkerVsDoer { get; set; }

        public SkillStat CombatSkill { get; set; }

        public string? VibeFunction { get; set; }

        public string? VibeOpinions { get; set; }

        public VibeEngagement VibeEngagement { get; set; }

        public string[] FavoriteUserIds { get; set; } = [];

        public Factions Faction { get; set; }

        public int InsuredAmount { get; set; }

        // Gig Reputation split into queryable columns
        public decimal GigReputationFixer { get; set; }
        public decimal GigReputationKiller { get; set; }
        public decimal GigReputationHacking { get; set; }
        public decimal GigReputationWellbeing { get; set; }

        // Property for API compatibility - maps to the separate columns
        [NotMapped]
        public Dictionary<string, decimal> GigReputation
        {
            get => new Dictionary<string, decimal>
            {
                ["FIXER"] = GigReputationFixer,
                ["KILLER"] = GigReputationKiller,
                ["HACKING"] = GigReputationHacking,
                ["WELLBEING"] = GigReputationWellbeing
            };
            set
            {
                if (value != null)
                {
                    GigReputationFixer = value.ContainsKey("FIXER") ? value["FIXER"] : 0;
                    GigReputationKiller = value.ContainsKey("KILLER") ? value["KILLER"] : 0;
                    GigReputationHacking = value.ContainsKey("HACKING") ? value["HACKING"] : 0;
                    GigReputationWellbeing = value.ContainsKey("WELLBEING") ? value["WELLBEING"] : 0;
                }
            }
        }

        public string NetworkAdminName { get; set; }

        // things below are obscured
        public virtual List<Relation> Relations { get; set; } = [];

        public virtual List<Goal> Goals { get; set; } = [];

        public virtual List<Meta> Meta { get; set; } = [];

        public virtual List<PrivateRecord> PrivateRecords { get; set; } = [];

        public virtual List<CriminalEvent> CriminalEvents { get; set; } = [];

        public virtual List<MedicalEvent> MedicalEvents { get; set; } = [];

        // hacker only
        public string[] Exploits { get; set; } = [];

        public MindHacks MindHack { get; set; }

        public string[] MindHackEnabledFor { get; set; } = []; 

        public string? HackerName { get; set; }

        /// <summary>
        /// Player's profession
        /// </summary>
        public string? Profession { get; set; }

        /// <summary>
        /// Player's affiliation
        /// </summary>
        public string? Affiliation { get; set; }

        /// <summary>
        /// Account number of the main account
        /// </summary>
        public string? MainAccount { get; set; }

        /// <summary>
        /// Personal ICE level
        /// </summary>
        public int? PersonalIce { get; set; }

        /// <summary>
        /// Epsilon-specific data stored as key-value pairs
        /// </summary>
        public Dictionary<string, string>? EpsilonData { get; set; }

        /// <summary>
        /// Plots this user is involved in (many-to-many relationship)
        /// </summary>
        public List<Plot>? Plots { get; set; }
    }
}