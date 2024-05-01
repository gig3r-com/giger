using System.Text.Json.Serialization;

namespace Giger.Models.GigModels
{
    [JsonConverter(typeof(JsonStringEnumConverter<GigStatus>))]
    public enum GigStatus
    {
        //[EnumMember(Value,
        AVAILABLE,
        IN_PROGRESS,
        COMPLETED,
        PENDING_CONFIRMATION,
        DISPUTE,
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
        INTEL,
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
        SEX_DOLL,
        QUICKIE,
        FIRST_AID,
        CYBERWARE,
        MEDEVAC,
        RENTING_LOCATION,
        BANK_ACCOUNT_MANIPULATION,
        SPOOFING,
        SECURITY,
        ANDROID_HIJACK,
        MINDEXPLOIT,
    }
}
