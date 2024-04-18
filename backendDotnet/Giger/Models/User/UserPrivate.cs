using Giger.Models.EventModels;
using Giger.Models.User.Records;
using Giger.Models.User.Stats;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public class UserPrivate : UserPublic
    {
        public CyberwareLevel CyberwareLevel { get; set; } // changeable
        
        public string ProfessionActual { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public UserTypes TypeActual { get; set; }
        
        public string[] Assets { get; set; } = []; // changeable ?? TODO: DELETE?

        public SkillStat HackingSkills { get; set; }
        
        public CharStat ConfrontationVsNegotiation { get; set; } 
        
        public CharStat CowardVsFighter { get; set; }

        public CharStat TalkativeVsSilent { get; set; }
        
        public CharStat ThinkerVsDoer { get; set; }
        
        public SkillStat CombatSkill { get; set; }
        
        public string VibeFunction { get; set; } // changeable
        
        [BsonRepresentation(BsonType.String)]
        public VibeEngagement VibeEngagement { get; set; }// changeable

        public string[] FavoriteUserIds { get; set; } = []; // changeable

        public Factions Faction { get; set; } // changeable

        // things below are obscured
        public Relation[] Relations { get; set; } = []; // changeable

        public Goal[] Goals { get; set; } = []; // changeable

        public Meta[] Meta { get; set; } = []; // changeable

        public PrivateRecord[] PrivateRecords { get; set; } = []; // changeable

        public CriminalEvent[] CriminalEvents { get; set; } = []; // changeable

        public MedicalEvent[] MedicalEvents { get; set; } = []; // changeable

        // hacker only
        public string[] Exploits { get; set; } = [];

        [BsonRepresentation(BsonType.String)]
        public MindHacks MindHack { get; set; }

        public string HackerName { get; set; }
    }
}