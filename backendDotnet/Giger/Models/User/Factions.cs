using System.ComponentModel;
using System.Text.Json.Serialization;

namespace Giger.Models.User
{
    [JsonConverter(typeof(JsonStringEnumConverter<Factions>))]
    public enum Factions
    {
        [Description("Takayama")]
        TAKAYAMA,

        [Description("Social Network")]
        SOCIAL_NETWORK,

        [Description("ConTech")]
        CONTECH,

        [Description("Gunners")]
        GUNNERS,

        [Description("Pawnshop 24/7")]
        PAWNSHOP_24_7,

        [Description("Spanks&Cuddles")]
        SPANKS_N_CUDDLES,

        [Description("Rabbids")]
        RABBIDS,

        [Description("Takayama Finance Agency")]
        TAKAYAMA_FINANCE_AGENCY,

        [Description("Humanists")]
        HUMANISTS,

        [Description("Omni Municipal Guard")]
        OMNI_MUNICIPAL_GUARD,

        [Description("Metamorphosis")]
        METAMORPHOSIS,

        [Description("Esthetics")]
        ESTHETICS,

        [Description("Quantum Elite Talent Syndicate")]
        QUANTUM_ELITE_TALENT_SYNDICATE,

        [Description("SynthPulse")]
        SYNTHPULSE,

        [Description("NuYu")]
        NUYU,

        [Description("Transcenders")]
        TRANSCENDERS,

        [Description("Hi-Tech Clinic")]
        HI_TECH_CLINIC,

        [Description("aSpot")]
        ASPOT,

        [Description("Beholder")]
        BEHOLDER,

        [Description("Anarchists")]
        ANARCHISTS,

        [Description("Head hunters")]
        HEAD_HUNTERS,

        [Description("Shaman")]
        SHAMAN,

        [Description("Nomads")]
        NOMADS,

        [Description("DoubleD")]
        DOUBLED,

        [Description("Foundation")]
        FOUNDATION,
    }
}
