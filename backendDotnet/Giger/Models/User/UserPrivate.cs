using Giger.Models.EventModels;
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

        [NotMapped]

        public Dictionary<string, decimal> GigReputation { get; set; } = [];

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
    }
}