using System.Text.Json.Serialization;

namespace Giger.Models.GigModels
{
    [JsonConverter(typeof(JsonStringEnumConverter<GigCategoryNames>))]
    public enum GigCategoryNames
    {
        REDACTED,
        INTEL,
        TECH,
        DELIVERY,
        GUNS_AND_AMMO,
        DRUGS,
        OTHER_MERCH,
        ITEM_ACQUSITION,
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
        COMPLAINT
    }
}
