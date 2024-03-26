using Giger.Models.EventModels;
using Giger.Models.User.Records;
using Giger.Models.User.Stats;

namespace Giger.Models.User
{
    public class UserPrivate : UserPublic
    {
        public CyberwareLevel CyberwareLevel { get; set; } // changeable
        public string ProfessionActual { get; set; }
        public UserTypes TypeActual { get; set; }
        public string[] Assets { get; set; }

        public SkillStat HackingSkills { get; set; }
        public CharStat ConfrontationVsNegotiation { get; set; } 
        public CharStat CowardVsFighter { get; set; }
        public CharStat TalkativeVsSilent { get; set; }
        public CharStat ThinkerVsDoer { get; set; }
        public SkillStat CombatSkill { get; set; }
        public string VibeFunction { get; set; }
        public VibeEngagement VibeEngagement { get; set; }

        public string[] FavoriteUserIds { get; set; }
        public Relation[] Relations { get; set; }
        public Goal[] Goals { get; set; }
        public Meta[] Meta { get; set; }
        public PrivateRecord[] PrivateRecords { get; set; }
        public CriminalEvent[] CriminalEvents { get; set; }
        public MedicalEvent[] MedicalEvents { get; set; }
    }
}