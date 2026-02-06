using Giger.Models.User;

namespace Giger.DTOs
{
    public class UserDTO
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
        public string VibeEngagement { get; set; }
        public string VibeFunction { get; set; }
        public string VibeOpinions { get; set; }
        public int ConfrontationistVsAgreeable { get; set; }
        public int CowardVsBrave { get; set; }
        public int TalkativeVsSilent { get; set; }
        public int ThinkerVsDoer { get; set; }
        public string Affiliation { get; set; }
        public string Profession { get; set; }
        public string Wealth { get; set; }
        public int CyberwareLevel { get; set; }
        public string Network { get; set; }
        public string NetworkAdmin { get; set; }
        public string Subnetwork { get; set; }
        
        // Transform int to { stat: int } for frontend
        public SkillStatDTO CombatSkill { get; set; }
        public SkillStatDTO HackingSkills { get; set; }
        
        public string MainAccount { get; set; }
        public Dictionary<string, decimal> GigReputation { get; set; }
        public int PersonalIce { get; set; }
        public string HackerName { get; set; }
        public string[] Exploits { get; set; }
        public string EpsilonNotes { get; set; }
        public string EpsilonBankingNotes { get; set; }
        public string EpsilonConversationNotes { get; set; }
        public string EpsilonPlots { get; set; }
        public Dictionary<string, string> EpsilonData { get; set; }
        public string[] FavoriteUserIds { get; set; }
        public RecordType[] Records { get; set; }
        public List<UserEpsilonConversationNote> EpsilonConversationsNotes { get; set; }

        public static UserDTO FromModel(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Roles = user.Roles,
                Handle = user.Handle,
                Summary = user.Summary ?? "",
                Active = user.Active,
                Name = user.Name ?? "",
                Surname = user.Surname,
                Faction = user.Faction ?? "",
                FactionRankPublic = user.FactionRankPublic ?? "",
                FactionRankActual = user.FactionRankActual ?? "",
                SpeciesPublic = user.SpeciesPublic ?? "",
                SpeciesActual = user.SpeciesActual ?? "",
                Vibe = user.Vibe ?? "",
                VibeLevel = user.VibeLevel,
                VibeEngagement = user.VibeEngagement ?? "",
                VibeFunction = user.VibeFunction ?? "",
                VibeOpinions = user.VibeOpinions ?? "",
                ConfrontationistVsAgreeable = user.ConfrontationistVsAgreeable,
                CowardVsBrave = user.CowardVsBrave,
                TalkativeVsSilent = user.TalkativeVsSilent,
                ThinkerVsDoer = user.ThinkerVsDoer,
                Affiliation = user.Affiliation ?? "",
                Profession = user.Profession ?? "",
                Wealth = user.Wealth ?? "",
                CyberwareLevel = user.CyberwareLevel,
                Network = user.Network ?? "",
                NetworkAdmin = user.NetworkAdmin ?? "",
                Subnetwork = user.Subnetwork ?? "",
                
                // Transform int to object with stat property
                CombatSkill = new SkillStatDTO { Stat = user.CombatSkill },
                HackingSkills = new SkillStatDTO { Stat = user.HackerSkill },
                
                MainAccount = user.MainAccount ?? "",
                GigReputation = user.GigReputation ?? new Dictionary<string, decimal>(),
                PersonalIce = user.PersonalIce,
                HackerName = user.HackerName ?? "",
                Exploits = user.Exploits,
                EpsilonNotes = user.EpsilonNotes ?? "",
                EpsilonBankingNotes = user.EpsilonBankingNotes ?? "",
                EpsilonConversationNotes = user.EpsilonConversationNotes ?? "",
                EpsilonPlots = user.EpsilonPlots ?? "",
                EpsilonData = user.EpsilonData ?? new Dictionary<string, string>(),
                FavoriteUserIds = user.FavoriteUsers?.Select(f => f.FavoriteUserHandle).ToArray() ?? Array.Empty<string>(),
                Records = user.Records?.ToArray() ?? Array.Empty<RecordType>(),
                EpsilonConversationsNotes = user.EpsilonConversationsNotes
            };
        }
    }

    public class SkillStatDTO
    {
        public int Stat { get; set; }
    }
}
