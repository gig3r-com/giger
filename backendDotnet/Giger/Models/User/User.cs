using Giger.Models.BankingModels;
using Giger.Models.MessageModels;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Giger.Models.Users
{
    public partial class User
    {
        public string Id { get; set; }
        
        public string[] Roles { get; set; }
        
        public string Handle { get; set; }
        
        public string Summary { get; set; }
        
        public bool Active { get; set; }
        
        public string Name { get; set; }
        
        public string Surname { get; set; }
        
        public string Faction { get; set; }
        
        public string FactionRankPublic { get; set; }
        
        public string FactionRankActual { get; set; }
        
        public string SpeciesPublic { get; set; }
        
        public string SpeciesActual { get; set; }
        
        public string Vibe { get; set; }
        
        public int VibeLevel { get; set; }
        
        public int ConfrontationistVsAgreeable { get; set; }

        public int CowardVsBrave { get; set; }
       
        public int TalkativeVsSilent { get; set; }
        
        public int ThinkerVsDoer { get; set; }
        
        public string Affiliation { get; set; }
        
        public string Profession { get; set; }
        
        public string Wealth { get; set; }
        
        public int CyberwareLevel { get; set; }
        
        public string Network { get; set; }
        
        public string Subnetwork { get; set; }
        
        public int CombatSkill { get; set; }
        
        public int HackerSkill { get; set; }
        
        public string[] FavoriteUsers { get; set; }

        [NotMapped]
        public RecordType[] HardRecords { get; set; }

        [NotMapped]
        public RecordType[] OffGameRecords { get; set; }

        [NotMapped]
        public RecordType[] MindRecords { get; set; }

        [NotMapped]
        public Account[] Accounts { get; set; }

        public string MainAccount { get; set; }
        
        [NotMapped]
        public Conversation[] Conversations { get; set; }
        
        [NotMapped]
        public Dictionary<string, int> GigReputation { get { return GigReputationDb.ToDictionary(kv => kv.Key, kv => int.Parse(kv.Value)); } }

        [JsonIgnore]
        public Dictionary<string, string> GigReputationDb { get; set; }

        [JsonIgnore]
        public Dictionary<string, string> GigReputationTrack { get; set; }

        public int PersonalIce { get; set; }
        
        public string HackerName { get; set; }
        
        public string[] Exploits { get; set; }
        
        [NotMapped]
        public Plot[] Plots { get; set; }
        
        public string EpsilonNotes { get; set; }
        
        public string EpsilonBankingNotes { get; set; }
        
        public string EpsilonConversationNotes { get; set; }
        
        public string EpsilonConversationsNotes { get; set; } // { participants: string[], notes: string, }[]; ??
              
        public string EpsilonPlots { get; set; }

        public Dictionary<string, string> EpsilonData { get; set; }
    }
}
