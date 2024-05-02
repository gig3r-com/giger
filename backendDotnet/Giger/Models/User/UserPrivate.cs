using Giger.Models.EventModels;
using Giger.Models.GigModels;
using Giger.Models.User.Records;
using Giger.Models.User.Stats;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public class UserPrivate : UserPublic
    {
        public required CyberwareLevel CyberwareLevel { get; set; }

        public required string ProfessionActual { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public required UserTypes TypeActual { get; set; }
        
        public string[] Assets { get; set; } = []; //TODO: DELETE?

        public required SkillStat HackingSkills { get; set; }

        public required CharStat ConfrontationVsNegotiation { get; set; }

        public required CharStat CowardVsFighter { get; set; }

        public required CharStat TalkativeVsSilent { get; set; }

        public required CharStat ThinkerVsDoer { get; set; }

        public required SkillStat CombatSkill { get; set; }

        public required string VibeFunction { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public required VibeEngagement VibeEngagement { get; set; }

        public string[] FavoriteUserIds { get; set; } = [];

        public required Factions Faction { get; set; }

        public Dictionary<GigCategoryNames, decimal> GigReputation { get; set; } = [];

        // things below are obscured
        public virtual Relation[] Relations { get; set; } = [];

        public virtual Goal[] Goals { get; set; } = [];

        public virtual Meta[] Meta { get; set; } = [];

        public virtual PrivateRecord[] PrivateRecords { get; set; } = [];

        public virtual CriminalEvent[] CriminalEvents { get; set; } = [];

        public virtual MedicalEvent[] MedicalEvents { get; set; } = [];

        // hacker only
        public string[] Exploits { get; set; } = [];

        [BsonRepresentation(BsonType.String)]
        public required MindHacks MindHack { get; set; }

        public string[] MindHackEnabledFor { get; set; } = []; 

        public required bool HasPlatinumPass { get; set; }

        public string? HackerName { get; set; }
    }
}