using Giger.Models.Obscured;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Giger.Models.GigModels
{
    public class Gig : ObscurableInfo
    {
        public decimal Payout { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required GigCategoryNames Category { get; set; }

        public required GigRepuationLevels RepurationRequired { get; set; }

        public bool IsAnonymizedAuthor { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required GigStatus Status { get; set; }

        public required string AuthorId { get; set; }

        public required string AuthorName { get; set; }

        public string? TakenById { get; set; }

        public override void Obscure()
        {
            Payout = -1;
            Title = REDACTED;
            Description = REDACTED;
            Category = GigCategoryNames.REDACTED;
            Status = GigStatus.COMPLETED;
            AuthorId = REDACTED;
            AuthorName = REDACTED;
        }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<GigStatus>))]
    public enum GigStatus
    {
        [EnumMember(Value = "available")]
        AVAILABLE,
        IN_PROGRESS,
        COMPLETED,
        PENDING,
        DISPUTE
    }

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
