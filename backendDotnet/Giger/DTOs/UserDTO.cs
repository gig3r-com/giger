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
        public string TypePublic { get; set; }
        public string TypeActual { get; set; }
        public string Vibe { get; set; }
        public int VibeLevel { get; set; }
        public string VibeEngagement { get; set; }
        public string VibeFunction { get; set; }
        public string VibeOpinions { get; set; }
        public SkillStatDTO ConfrontationistVsAgreeable { get; set; }
        public SkillStatDTO CowardVsBrave { get; set; }
        public SkillStatDTO TalkativeVsSilent { get; set; }
        public SkillStatDTO ThinkerVsDoer { get; set; }
        public string Affiliation { get; set; }
        public string Profession { get; set; }
        public string WealthLevel { get; set; }
        public SkillStatDTO CyberwareLevel { get; set; }
        public string NetworkName { get; set; }
        public string NetworkAdminName { get; set; }
        public string SubnetworkName { get; set; }
        public bool HighSecurity { get; set; }
        public bool HasPlatinumPass { get; set; }
        public int InsuredAmount { get; set; }

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
                TypePublic = user.SpeciesPublic ?? "",
                TypeActual = user.SpeciesActual ?? "",
                Vibe = user.Vibe ?? "",
                VibeLevel = user.VibeLevel,
                VibeEngagement = user.VibeEngagement ?? "",
                VibeFunction = user.VibeFunction ?? "",
                VibeOpinions = user.VibeOpinions ?? "",
                ConfrontationistVsAgreeable = new SkillStatDTO { Stat = user.ConfrontationistVsAgreeable },
                CowardVsBrave = new SkillStatDTO { Stat = user.CowardVsBrave },
                TalkativeVsSilent = new SkillStatDTO { Stat = user.TalkativeVsSilent },
                ThinkerVsDoer = new SkillStatDTO { Stat = user.ThinkerVsDoer },
                Affiliation = user.Affiliation ?? "",
                Profession = user.Profession ?? "",
                WealthLevel = user.Wealth ?? "",
                CyberwareLevel = new SkillStatDTO { Stat = user.CyberwareLevel },
                NetworkName = user.Network ?? "",
                NetworkAdminName = user.NetworkAdmin ?? "",
                SubnetworkName = user.Subnetwork ?? "",
                HighSecurity = user.HighSecurity,
                HasPlatinumPass = user.HasPlatinumPass,
                InsuredAmount = user.InsuredAmount,

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
