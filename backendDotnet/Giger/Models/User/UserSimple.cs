using Giger.Models.EventModels;
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
        //public int RelationsHash 
        //{ 
        //    get 
        //    {
        //        int hashCode = 3;
        //        foreach (var relation in Relations)
        //        {
        //            hashCode ^= relation.GetHashCode();
        //        }
        //        return hashCode;
        //    }
        //}

        [JsonIgnore]
        public override Goal[] Goals { get; set; }
        //public int GoalsHash
        //{
        //    get
        //    {
        //        int hashCode = 5;
        //        foreach (var goal in Goals)
        //        {
        //            hashCode ^= goal.GetHashCode();
        //        }
        //        return hashCode;
        //    }

        [JsonIgnore]
        public override Meta[] Meta { get; set; }
        //public int MetaHash
        //{
        //    get
        //    {
        //        int hashCode = 7;
        //        foreach (var meta in Meta)
        //        {
        //            hashCode ^= meta.GetHashCode();
        //        }
        //        return hashCode;
        //    }
        //}

        [JsonIgnore]
        public override PrivateRecord[] PrivateRecords { get; set; }
        //public int PrivateRecordsHash
        //{
        //    get
        //    {
        //        int hashCode = 13;
        //        foreach (var privateRecord in PrivateRecords)
        //        {
        //            hashCode ^= privateRecord.GetHashCode();
        //        }
        //        return hashCode;
        //    }
        //}

        [JsonIgnore]
        public override CriminalEvent[] CriminalEvents { get; set; }
        //public int CriminalEventsHash
        //{
        //    get
        //    {
        //        int hashCode = 17;
        //        foreach (var criminalEvent in CriminalEvents)
        //        {
        //            hashCode ^= criminalEvent.GetHashCode();
        //        }
        //        return hashCode;
        //    }
        //}

        [JsonIgnore]
        public override MedicalEvent[] MedicalEvents { get; set; }
        //public int MedicalEventsHash
        //{
        //    get
        //    {
        //        int hashCode = 23;
        //        foreach (var medicalEvent in MedicalEvents)
        //        {
        //            hashCode ^= medicalEvent.GetHashCode();
        //        }
        //        return hashCode;
        //    }
        //}

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
            ProfessionPublic = user.ProfessionPublic;
            Surname = user.Surname;
            Age = user.Age;
            Vibe = user.Vibe;
            WealthLevel = user.WealthLevel;
            NetworkId = user.NetworkId;
            NetworkName = user.NetworkName;
            SubnetworkId = user.SubnetworkId;
            SubnetworkName = user.SubnetworkName;

            CyberwareLevel = user.CyberwareLevel;
            ProfessionActual = user.ProfessionActual;
            TypeActual = user.TypeActual;
            Assets = user.Assets;
            HackingSkills = user.HackingSkills;
            ConfrontationVsNegotiation = user.ConfrontationVsNegotiation;
            CowardVsFighter = user.CowardVsFighter;
            TalkativeVsSilent = user.TalkativeVsSilent;
            ThinkerVsDoer = user.ThinkerVsDoer;
            CombatSkill = user.CombatSkill;
            VibeFunction = user.VibeFunction;
            VibeEngagement = user.VibeEngagement;
            FavoriteUserIds = user.FavoriteUserIds;
            Faction = user.Faction;
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