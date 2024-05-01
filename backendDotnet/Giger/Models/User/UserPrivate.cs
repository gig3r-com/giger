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
        public required CyberwareLevel CyberwareLevel { get; set; } // changeable

        public required string ProfessionActual { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public required UserTypes TypeActual { get; set; }
        
        public string[] Assets { get; set; } = []; // changeable ?? TODO: DELETE?

        public required SkillStat HackingSkills { get; set; }

        public required CharStat ConfrontationVsNegotiation { get; set; }

        public required CharStat CowardVsFighter { get; set; }

        public required CharStat TalkativeVsSilent { get; set; }

        public required CharStat ThinkerVsDoer { get; set; }

        public required SkillStat CombatSkill { get; set; }

        public required string VibeFunction { get; set; } // changeable
        
        [BsonRepresentation(BsonType.String)]
        public required VibeEngagement VibeEngagement { get; set; }// changeable

        public string[] FavoriteUserIds { get; set; } = []; // changeable

        public required Factions Faction { get; set; } // changeable

        public Dictionary<GigCategoryNames, decimal> GigRepution { get; set; } = [];

        // things below are obscured
        public virtual Relation[] Relations { get; set; } = []; // changeable

        public virtual Goal[] Goals { get; set; } = []; // changeable

        public virtual Meta[] Meta { get; set; } = []; // changeable

        public virtual PrivateRecord[] PrivateRecords { get; set; } = []; // changeable

        public virtual CriminalEvent[] CriminalEvents { get; set; } = []; // changeable

        public virtual MedicalEvent[] MedicalEvents { get; set; } = []; // changeable

        // hacker only
        public string[] Exploits { get; set; } = [];

        [BsonRepresentation(BsonType.String)]
        public required MindHacks MindHack { get; set; }

        // TODO: lista ID użytkowników którzy mogą zmindhackować
        public string[] MindHackEnabledFor { get; set; } = []; 

        // TODO: endpoint do zmiany - tylko GOD może zmienić
        public required bool HasPlatinumPass { get; set; }

        public string? HackerName { get; set; }
    }
}