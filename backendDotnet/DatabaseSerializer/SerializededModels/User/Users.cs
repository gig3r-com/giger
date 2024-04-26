using Giger.Models.EventModels;
using Giger.Models.User;
using MongoDB.Bson;

namespace Giger.SerializededModels.User
{
    public class Users     
    {
        public UserPrivate[] UsersTable { get; set; }

        public Users()
        {
            UsersTable = [
                new UserPrivate()
                {
                    Id = "123456",
                    Name = "Johnny",
                    Handle = "jsilver",
                    Roles = [],
                    AliasMap = [],
                    Active = true,
                    TypePublic = UserTypes.HUMAN,
                    ProfessionPublic = "Clerk",
                    Surname = "Silverhand",
                    Age = 25,
                    Vibe = Vibe.DIZORDERS,
                    WealthLevel = WealthLevels.MODEST,
                    NetworkId = "N666",
                    NetworkName = "The Matrix",
                    SubnetworkId = "SN999",
                    SubnetworkName = "Subnetwork1",

                    //private
                    CyberwareLevel = 4,
                    ProfessionActual = "Gang boss",
                    TypeActual = UserTypes.HUMAN,
                    Assets = [],
                    HackingSkills = 0,
                    ConfrontationVsNegotiation = 0,
                    CowardVsFighter = 4,
                    TalkativeVsSilent = 1,
                    ThinkerVsDoer = 3,
                    CombatSkill = 4,
                    VibeFunction = "Gang leader",
                    VibeEngagement = VibeEngagement.FANATIC,
                    FavoriteUserIds = ["123457"],
                    Faction = Factions.Gunners,
                    Relations = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Title = "Friend",
                            UserId = "123457",
                            Description = "Best friend",
                            IsRevealed = true
                        }
                    ],
                    Goals = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Title = "Kill the boss",
                            Description = "Kill the boss of the rival gang",
                            IsRevealed = true
                        }
                    ],
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
                    ],
                    PrivateRecords = [
                        new()
                        {
                            Id = "661737df07174e02083a9ef5",
                            Title = "Secret",
                            Description = "I've crashed car when driving on drugs",
                            IsRevealed = false
                        }
                    ],
                    CriminalEvents = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Type = CriminalEventType.WITNESS,
                            Name = "Killed the corporation manager",
                            EventDescription = "Killed the boss of the rival gang",
                            Status = EventStatus.HISTORICAL,
                            TimeStamp = GigerDateTime.Now.Subtract(TimeSpan.FromDays(10)),
                            IsRevealed = true,
                        }
                    ],
                    MedicalEvents = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Name = "Got shot",
                            EventDescription = "Got shot in the leg",
                            Status = EventStatus.HISTORICAL,
                            Type = MedicalEventType.SYMPTOM,
                            TimeStamp = GigerDateTime.Now.Subtract(TimeSpan.FromDays(2)),
                            IsRevealed = true
                        }
                    ],
                    Exploits = ["Exploit1", "Exploit2"],
                    MindHack = MindHacks.Enabled,
                    MindHackEnabledFor = ["123456"],
                    HasPlatinumPass = true,
                    HackerName = null,
                },

                new UserPrivate()
                {
                    Id = "123457",
                    Name = "Tom",
                    Handle = "triddle",
                    Roles = [ UserRoles.ADMIN ],
                    AliasMap = [],
                    Active = true,
                    TypePublic = UserTypes.HUMAN,
                    ProfessionPublic = "Clerk",
                    Surname = "Riddle",
                    Age = 21,
                    Vibe = Vibe.HEDONIZERS,
                    WealthLevel = WealthLevels.BROKE,
                    NetworkId = "N666",
                    NetworkName = "The Matrix",
                    SubnetworkId = "SN999",
                    SubnetworkName = "Subnetwork2",

                    //private
                    CyberwareLevel = 4,
                    ProfessionActual = "Hacker",
                    TypeActual = UserTypes.HUMAN,
                    Assets = [],
                    HackingSkills = 3,
                    ConfrontationVsNegotiation = 0,
                    CowardVsFighter = 4,
                    TalkativeVsSilent = 1,
                    ThinkerVsDoer = 3,
                    CombatSkill = 4,
                    VibeFunction = "Gang Hacker",
                    VibeEngagement = VibeEngagement.DISINTERESTED,
                    FavoriteUserIds = ["123456"],
                    Faction = Factions.Gunners,
                    Relations = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Title = "Boss",
                            UserId = "123456",
                            Description = "boss of the gang",
                            IsRevealed = true
                        }
                    ],
                    Goals = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Title = "Kill the boss",
                            Description = "Kill the boss of the rival gang",
                            IsRevealed = true
                        }
                    ],
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
                    ],
                    PrivateRecords = [],
                    CriminalEvents = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Type = CriminalEventType.WITNESS,
                            Name = "Hacker the corporation",
                            EventDescription = "Managed to break through ",
                            Status = EventStatus.HISTORICAL,
                            TimeStamp = GigerDateTime.Now.Subtract(TimeSpan.FromDays(10)),
                            IsRevealed = true,
                        }
                    ],
                    MedicalEvents = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Name = "Got shot",
                            EventDescription = "Got shot in the leg",
                            Status = EventStatus.HISTORICAL,
                            Type = MedicalEventType.SYMPTOM,
                            TimeStamp = GigerDateTime.Now.Subtract(TimeSpan.FromDays(2)),
                            IsRevealed = true
                        }
                    ],
                    Exploits = ["Exploit1", "Exploit2"],
                    MindHack = MindHacks.Disabled,
                    MindHackEnabledFor = [],
                    HasPlatinumPass = false,
                    HackerName = "voldemort",
                }
            ];
        }
    }
}