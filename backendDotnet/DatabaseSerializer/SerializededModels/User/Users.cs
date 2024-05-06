using Giger.Models.EventModels;
using Giger.Models.GigModels;
using Giger.Models.User;

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
                    Vibe = Vibe.DIZORDERS,
                    WealthLevel = WealthLevels.MODEST,
                    NetworkId = "N666",
                    NetworkName = "The Matrix",
                    SubnetworkId = "SN999",
                    SubnetworkName = "Subnetwork1",
                    NetworkAdminName = "triddle",

                    //private
                    CyberwareLevel = 4,
                    ProfessionActual = "Gang boss",
                    TypeActual = UserTypes.HUMAN,
                    Assets = [],
                    HackingSkills = 0,
                    ConfrontationistVsAgreeable = 0,
                    CowardVsBrave = 4,
                    TalkativeVsSilent = 1,
                    ThinkerVsDoer = 3,
                    CombatSkill = 4,
                    VibeFunction = "Gang leader",
                    VibeEngagement = VibeEngagement.FANATIC,
                    FavoriteUserIds = ["123457"],
                    Faction = Factions.gunners,
                    FactionRankActual = "Boss",
                    FactionRankPublic = "Boss",
                    InsuredAmount = 0,
                    Relations = [
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Title = null,
                            UserName = "triddle",
                            Description = "Best friend",
                            IsRevealed = true
                        }
                    ],
                    Goals = [
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Title = "Kill the boss",
                            Description = "Kill the boss of the rival gang",
                            IsRevealed = true
                        }
                    ],
                    Meta = [
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Title = "Use this code if you took LSD drug",
                            Description = "q12we34r",
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
                            Id = Guid.NewGuid().ToString(),
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
                            Id = Guid.NewGuid().ToString(),
                            Name = "Got shot",
                            EventDescription = "Got shot in the leg",
                            Status = EventStatus.HISTORICAL,
                            Type = MedicalEventType.SYMPTOM,
                            TimeStamp = GigerDateTime.Now.Subtract(TimeSpan.FromDays(2)),
                            IsRevealed = true
                        }
                    ],
                    Exploits = ["Exploit1", "Exploit2"],
                    MindHack = MindHacks.ENABLED,
                    MindHackEnabledFor = ["123457"],
                    HasPlatinumPass = true,
                    HighSecurity = true,
                    HackerName = null,
                    GigReputation = new Dictionary<GigCategoryNames, decimal>() {
                        { GigCategoryNames.HACKING, 0m },
                        { GigCategoryNames.KILLER, 5500m },
                        { GigCategoryNames.FIXER, 500m },
                        { GigCategoryNames.WELLBEING, 2000m }
                    },
                    ReputationDescription = "Fancy hitman"
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
                    Vibe = Vibe.HEDONIZERS,
                    WealthLevel = WealthLevels.BROKE,
                    NetworkId = "N666",
                    NetworkName = "The Matrix",
                    SubnetworkId = "SN1337",
                    SubnetworkName = "Subnetwork2",
                    NetworkAdminName = "triddle",

                    //private
                    CyberwareLevel = 4,
                    ProfessionActual = "Hacker",
                    TypeActual = UserTypes.HUMAN,
                    Assets = [],
                    HackingSkills = 3,
                    ConfrontationistVsAgreeable = 0,
                    CowardVsBrave = 4,
                    TalkativeVsSilent = 1,
                    ThinkerVsDoer = 3,
                    CombatSkill = 4,
                    VibeFunction = "Gang Hacker",
                    VibeEngagement = VibeEngagement.DISINTERESTED,
                    FavoriteUserIds = ["123456"],
                    Faction =  Factions.high_tech,
                    FactionRankActual = "Hacker",
                    FactionRankPublic = "Janitor",
                    InsuredAmount = 1000,
                    Relations = [
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Title = "Boss",
                            UserName = "jsilver",
                            Description = "boss of the gang",
                            IsRevealed = true
                        }
                    ],
                    Goals = [
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Title = "Kill the boss",
                            Description = "Kill the boss of the rival gang",
                            IsRevealed = true
                        }
                    ],
                    Meta = [
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Title = "Use this code if you took LSD drug",
                            Description = "q12we34r",
                        }
                    ],
                    PrivateRecords = [],
                    CriminalEvents = [
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
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
                            Id = Guid.NewGuid().ToString(),
                            Name = "Got shot",
                            EventDescription = "Got shot in the leg",
                            Status = EventStatus.HISTORICAL,
                            Type = MedicalEventType.SYMPTOM,
                            TimeStamp = GigerDateTime.Now.Subtract(TimeSpan.FromDays(2)),
                            IsRevealed = true
                        }
                    ],
                    Exploits = ["Exploit1", "Exploit2"],
                    MindHack = MindHacks.DISABLED,
                    MindHackEnabledFor = [],
                    HasPlatinumPass = false,
                    HighSecurity = false,
                    HackerName = "voldemort",
                    GigReputation = new Dictionary<GigCategoryNames, decimal>() {
                        { GigCategoryNames.HACKING, 100000m },
                        { GigCategoryNames.KILLER, 0m },
                        { GigCategoryNames.FIXER, 2000m },
                        { GigCategoryNames.WELLBEING, 3000m }
                    },
                    ReputationDescription = "Master hacker, but not killer"
                },

                new UserPrivate()
                {
                    Id = "123458",
                    Name = "Alice",
                    Handle = "alice",
                    Roles = [],
                    AliasMap = [],
                    Active = true,
                    TypePublic = UserTypes.HUMAN,
                    ProfessionPublic = "Engineer",
                    Surname = "Smith",
                    Vibe = Vibe.DIZORDERS,
                    WealthLevel = WealthLevels.IMPOVERISHED,
                    NetworkId = "N666",
                    NetworkName = "The Matrix",
                    SubnetworkId = "SN1337",
                    SubnetworkName = "Subnetwork2",
                    NetworkAdminName = "triddle",
                    CyberwareLevel = 2,
                    ProfessionActual = "Engineer",
                    TypeActual = UserTypes.HUMAN,
                    Assets = [],
                    HackingSkills = 1,
                    ConfrontationistVsAgreeable = 2,
                    CowardVsBrave = 3,
                    TalkativeVsSilent = 2,
                    ThinkerVsDoer = 3,
                    CombatSkill = 2,
                    VibeFunction = "Engineer",
                    VibeEngagement = VibeEngagement.FANATIC,
                    FavoriteUserIds = ["123457"],
                    Faction = Factions.gunners,
                    FactionRankActual = "Engineer",
                    FactionRankPublic = "Engineer",
                    InsuredAmount = 1000,
                    Relations = [],
                    Goals = [],
                    Meta = [],
                    PrivateRecords = [],
                    CriminalEvents = [],
                    MedicalEvents = [],
                    Exploits = [],
                    MindHack = MindHacks.DISABLED,
                    MindHackEnabledFor = [],
                    HasPlatinumPass = false,
                    HighSecurity = false,
                    HackerName = null,
                    GigReputation = new Dictionary<GigCategoryNames, decimal>() {
                        { GigCategoryNames.HACKING, 0m },
                        { GigCategoryNames.KILLER, 0m },
                        { GigCategoryNames.FIXER, 0m },
                        { GigCategoryNames.WELLBEING, 0m }
                    },
                    ReputationDescription = "Engineer"
                },

                new UserPrivate()
                {
                    Id = "123459",
                    Name = "Bob",
                    Handle = "bob",
                    Roles = [UserRoles.ADMIN],
                    AliasMap = [],
                    Active = true,
                    TypePublic = UserTypes.HUMAN,
                    ProfessionPublic = "Doctor",
                    Surname = "Johnson",
                    Vibe = Vibe.HEDONIZERS,
                    WealthLevel = WealthLevels.ELITE,
                    NetworkId = "N888",
                    NetworkName = "The Net",
                    SubnetworkId = "SN777",
                    SubnetworkName = "Subnetwork4",
                    NetworkAdminName = "bob",
                    CyberwareLevel = 3,
                    ProfessionActual = "Doctor",
                    TypeActual = UserTypes.HUMAN,
                    Assets = [],
                    HackingSkills = 0,
                    ConfrontationistVsAgreeable = 1,
                    CowardVsBrave = 4,
                    TalkativeVsSilent = 3,
                    ThinkerVsDoer = 2,
                    CombatSkill = 1,
                    VibeFunction = "Doctor",
                    VibeEngagement = VibeEngagement.DISINTERESTED,
                    FavoriteUserIds = ["123456"],
                    Faction = Factions.high_tech,
                    FactionRankActual = "Doctor",
                    FactionRankPublic = "Doctor",
                    InsuredAmount = 2000,
                    Relations = [],
                    Goals = [],
                    Meta = [],
                    PrivateRecords = [],
                    CriminalEvents = [],
                    MedicalEvents = [],
                    Exploits = [],
                    MindHack = MindHacks.DISABLED,
                    MindHackEnabledFor = [],
                    HasPlatinumPass = true,
                    HighSecurity = true,
                    HackerName = null,
                    GigReputation = new Dictionary<GigCategoryNames, decimal>() {
                        { GigCategoryNames.HACKING, 0m },
                        { GigCategoryNames.KILLER, 0m },
                        { GigCategoryNames.FIXER, 0m },
                        { GigCategoryNames.WELLBEING, 0m }
                    },
                    ReputationDescription = "Doctor"
                }

            ];
        }
    }
}