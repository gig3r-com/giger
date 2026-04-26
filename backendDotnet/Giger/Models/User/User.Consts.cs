using System.Text.Json.Serialization;

namespace Giger.Models.Users
{
    public partial class User
    {
        // User Types
        public const string ROLE_INFLUENCER = "INFLUENCER";
        public const string ROLE_ADMIN = "ADMIN";
        public const string ROLE_MODERATOR = "MODERATOR";
        public const string ROLE_BOSS = "BOSS";
        public const string ROLE_NPC = "NPC";
        public const string ROLE_GOD = "GOD";

        // Factions
        public const string GUNNERS = "Gunners";
        public const string SPANKS_AND_CUDDLES = "Spanks&Cuddles";
        public const string RABBIDS = "Rabbids";
        public const string PAWNSHOP_24_7 = "Pawnshop 24/7";
        public const string O_M_G = "Omni Municipal Guard";
        public const string HUMANISTS = "Humanists";
        public const string METAMORPHOSIS = "Metamorphosis";
        public const string T_F_A = "Takayama Finance Agency";
        public const string DOUBLE_D = "DoubleD";
        public const string ESTHETICS = "Esthetics";
        public const string Q_E_T_S = "Quantum Elite Talent Syndicate";
        public const string SYNTH_PULSE = "SynthPulse";
        public const string NU_YU = "NuYu";
        public const string TRANSHUMAN = "Transcenders";
        public const string HI_TECH = "Hi-Tech Clinic";
        public const string A_SPOT = "aSpot";
        public const string BEHOLDER = "Beholder";
        public const string ANARCHY = "Anarchists";
        public const string NOMADS = "Nomads";
        public const string FOUNDATION = "Foundation";
        public const string SHAMAN = "Shaman";
        public const string HEAD_HUNTERS = "Head hunters";
        public const string REAPERS = "Reapers";
        public const string LOADED_CHAMBER = "The Loaded Chamber";
        public const string BYTE_BAR = "Byte Bar";
        public const string TAKAYAMA_OFFICIAL = "Takayama";
        public const string SOCIAL_NET = "Social Network";
        public const string CONTECH_REGIONAL = "ConTech";
    }

    [JsonConverter(typeof(JsonStringEnumConverter<WealthLevels>))]
    public enum WealthLevels
    {
        BROKE,
        IMPOVERISHED,
        STRUGGLING,
        MODEST,
        STABLE,
        COMFORTABLE,
        AFFLUENT,
        ELITE
    }
}