using System.ComponentModel;
using System.Text.Json.Serialization;

namespace Giger.Models.User
{
    [JsonConverter(typeof(JsonStringEnumConverter<Factions>))]
    public enum Factions
    {
        [Description("Gunners")]
        gunners,

        [Description("Spanks&Cuddles")]
        spanks_and_cuddles,

        [Description("Rabbids")]
        rabbids,

        [Description("Pawnshop 24/7")]
        pawnshop_24_7,

        [Description("Omni Municipal Guard")]
        o_m_g,

        [Description("Humanists")]
        humanists,

        [Description("Metamorphosis")]
        metamorphosis,

        [Description("Takayama Finance Agency")]
        t_f_a,

        [Description("DoubleD")]
        double_d,

        [Description("Esthetics")]
        esthetics,

        [Description("Quantum Elite Talent Syndicate")]
        q_e_t_s,

        [Description("SynthPulse")]
        synth_pulse,

        [Description("NuYu")]
        nu_yu,

        [Description("Transcenders")]
        transhuman,

        [Description("Hi-Tech Clinic")]
        hi_tech,

        [Description("aSpot")]
        a_spot,

        [Description("Beholder")]
        beholder,

        [Description("Anarchists")]
        anarchy,

        [Description("Nomads")]
        nomads,

        [Description("Foundation")]
        foundation,

        [Description("Shaman")]
        shaman,

        [Description("Head hunters")]
        head_hunters,

        [Description("Reapers")]
        reapers,

        [Description("The Loaded Chamber")]
        loaded_chamber,

        [Description("Byte Bar")]
        byte_bar,

        [Description("Takayama")]
        takayama_official,

        [Description("Social Network")]
        social_net,

        [Description("ConTech")]
        contech_regional,
    }
}
