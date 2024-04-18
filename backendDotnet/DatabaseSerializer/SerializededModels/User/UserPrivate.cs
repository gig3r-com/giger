using Giger.Models.EventModels;
using MongoDB.Bson;

namespace Giger.SerializededModels.User
{
    public class UserPrivate : Models.User.UserPrivate
    {
        public UserPrivate()
        {
            Id = "123456";
            Name = "Johnny";
            Handle = "jsilver";
            //Roles = [];
            AliasMap = [];
            Active = true;
            TypePublic = Models.User.UserTypes.HUMAN;
            ProfessionPublic = "Clerk";
            Surname = "Silverhand";
            Age = 25;
            Vibe = Models.User.Vibe.HEDONIZERS;
            WealthLevel = Models.User.WealthLevels.MODEST;
            NetworkId = "N666";
            SubnetworkId = "SN999";

            //private
            CyberwareLevel = 4;
            ProfessionActual = "Gang boss";
            TypeActual = Models.User.UserTypes.HUMAN;
            //Assets = ["car", "house"];
            HackingSkills = 1;
            ConfrontationVsNegotiation = 0;
            CowardVsFighter = 4;
            TalkativeVsSilent = 1;
            ThinkerVsDoer = 3;
            CombatSkill = 4;
            VibeFunction = "Gang leader";
            VibeEngagement = Models.User.VibeEngagement.FANATIC;
            FavoriteUserIds = ["123457"];
            Faction = Models.User.Factions.Gunners;
            Relations = [
                new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Title = "Friend",
                    UserId = "123457",
                    Description = "Best friend",
                    IsRevealed = true
                }
            ];
            Goals = [
                new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Title = "Kill the boss",
                    Description = "Kill the boss of the rival gang",
                    IsRevealed = true
                }
            ];
            Meta = [
                new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Title = "Use this code if you took LSD drug",
                    Description = "q12we34r",
                    Type = Models.User.Records.MetaTypes.Inspirations,
                    IsLink = false,
                    IsRevealed = true
                }
            ];
            PrivateRecords = [
                new()
                {
                    Id = "661737df07174e02083a9ef5",
                    Title = "Secret",
                    Description = "I've crashed car when driving on drugs",
                    IsRevealed = false
                }
            ];
            CriminalEvents = [
                new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Type = CriminalEventType.WITNESS,
                    Name = "Killed the corporation manager",
                    EventDescription = "Killed the boss of the rival gang",
                    Status = EventStatus.HISTORICAL,
                    TimeStamp = DateTime.Now.Subtract(TimeSpan.FromDays(10)),
                    IsRevealed = true,
                }
            ];
            MedicalEvents = [
                new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Name = "Got shot",
                    EventDescription = "Got shot in the leg",
                    Status = EventStatus.HISTORICAL,
                    Type = MedicalEventType.SYMPTOM,
                    TimeStamp = DateTime.Now.Subtract(TimeSpan.FromDays(2)),
                    IsRevealed = true
                }
            ];
            Exploits = ["Exploit1", "Exploit2"];
            MindHack = Models.User.MindHacks.Enabled;
            HackerName = "SilverSliver";
        }
    }
}