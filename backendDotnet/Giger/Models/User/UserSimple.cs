using Giger.Models.EventModels;
using Giger.Models.Hashes;
using Giger.Models.User.Records;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Giger.Models.User
{
    public class UserSimple : UserPrivate
    {
        public RecordsHashes Hashes { get; set; }

        [JsonIgnore]
        public override Relation[] Relations { get; set; }

        [JsonIgnore]
        public override Goal[] Goals { get; set; }

        [JsonIgnore]
        public override Meta[] Meta { get; set; }

        [JsonIgnore]
        public override PrivateRecord[] PrivateRecords { get; set; }

        [JsonIgnore]
        public override CriminalEvent[] CriminalEvents { get; set; }

        [JsonIgnore]
        public override MedicalEvent[] MedicalEvents { get; set; }

        public UserSimple() { }

        [SetsRequiredMembers]
        public UserSimple(UserPrivate user)
        {
            Hashes = new RecordsHashes(user);

            Id = user.Id;
            Name = user.Name;
            Handle = user.Handle;
            Roles = user.Roles;
            AliasMap = user.AliasMap;
            Active = user.Active;
            TypePublic = user.TypePublic;
            FactionRankPublic = user.FactionRankPublic;
            Surname = user.Surname;
            Vibe = user.Vibe;
            WealthLevel = user.WealthLevel;
            NetworkId = user.NetworkId;
            NetworkName = user.NetworkName;
            SubnetworkId = user.SubnetworkId;
            SubnetworkName = user.SubnetworkName;
            NetworkAdminName = user.NetworkAdminName;

            CyberwareLevel = user.CyberwareLevel;
            TypeActual = user.TypeActual;
            Assets = user.Assets;
            HackingSkills = user.HackingSkills;
            ConfrontationistVsAgreeable = user.ConfrontationistVsAgreeable;
            CowardVsBrave = user.CowardVsBrave;
            TalkativeVsSilent = user.TalkativeVsSilent;
            ThinkerVsDoer = user.ThinkerVsDoer;
            CombatSkill = user.CombatSkill;
            VibeFunction = user.VibeFunction;
            VibeEngagement = user.VibeEngagement;
            VibeOpinions = "";
            FavoriteUserIds = user.FavoriteUserIds;
            Faction = user.Faction;
            FactionRankActual = user.FactionRankActual;
            Relations = user.Relations;
            Goals = user.Goals;
            Meta = user.Meta;
            PrivateRecords = user.PrivateRecords;
            CriminalEvents = user.CriminalEvents;
            MedicalEvents = user.MedicalEvents;
            GigReputation = user.GigReputation;
            Exploits = user.Exploits;
            MindHack = user.MindHack;
            MindHackEnabledFor = user.MindHackEnabledFor;
            HasPlatinumPass = user.HasPlatinumPass;
            HackerName = user.HackerName;
        }
    }
}