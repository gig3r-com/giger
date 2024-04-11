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

        public string Title { get; set; }

        public string Description { get; set; }

        [BsonRepresentation(BsonType.String)]
        public GigCategoryNames Category { get; set; }

        public GigRepuationLevels RepurationRequired { get; set; }

        public bool IsAnonymizedAuthor { get; set; }

        [BsonRepresentation(BsonType.String)]
        public GigStatus Status { get; set; }

        public required string AuthorId { get; set; }

        public required string AuthorName { get; set; }

        public string? TakenById { get; set; }
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
}
