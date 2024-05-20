using System.ComponentModel;
using System.Text.Json.Serialization;

namespace Giger.Models.GigModels
{
    [JsonConverter(typeof(JsonStringEnumConverter<GigStatus>))]
    public enum GigStatus
    {
        [Description("available")]
        AVAILABLE,

        [Description("in progress")]
        IN_PROGRESS,

        [Description("completed")]
        COMPLETED,
        
        [Description("pending confirmation")]
        PENDING_CONFIRMATION,
        
        [Description("disptue")]
        DISPUTE,
        
        [Description("expired")]
        EXPIRED
    }

    [JsonConverter(typeof(JsonStringEnumConverter<GigModes>))]
    public enum GigModes
    {
        /// <summary>
        /// Author orders work, pays
        /// </summary>
        CLIENT,
        /// <summary>
        /// Author does work, gets paid
        /// </summary>
        PROVIDER
    }

    [JsonConverter(typeof(JsonStringEnumConverter<GigCategoryNames>))]
    public enum GigCategoryNames
    {
        REDACTED,
        FIXER,
        KILLER,
        HACKING,
        WELLBEING,
    }

    [JsonConverter(typeof(JsonStringEnumConverter<GigSubcategoryNames>))]
    public enum GigSubcategoryNames
    {
        REDACTED,
        TECH,
        DELIVERY,
        GUNS_AND_AMMO,
        DRUGS,
        OTHER_MERCH,
        ITEM_ACQUISITION,
        ANDROID_ACQUISITION,
        DEBT_COLLECTION,
        INTIMIDATION,
        KIDNAPPING,
        BODYGUARD,
        HIT,
        LOVER_EXPERIENCE,
        ENTERTAINMENT,
        SEX_DOLL,
        QUICKIE,
        FIRST_AID,
        CYBERWARE,
        MEDEVAC,
        RENTING_LOCATION,
        INTEL,
        BANK_ACCOUNT_MANIPULATION,
        SPOOFING,
        SECURITY,
        ANDROID_HIJACK,
        MINDEXPLOIT,
    }
}
