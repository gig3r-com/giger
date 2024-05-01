using Giger.Models.Obscured;
using Giger.Models.User;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.GigModels
{
    public class Gig : ObscurableInfo
    {
        public required decimal Payout { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public string? ConversasionId { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required GigCategoryNames Category { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required GigSubcategoryNames Subcategory { get; set; }

        public required GigRepuationLevels RepurationRequired { get; set; }

        public bool IsAnonymizedAuthor { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required GigStatus Status { get; set; }

        public required string AuthorId { get; set; }

        public required string AuthorName { get; set; }

        public string? TakenById { get; set; }

        public Factions? TakenForCompany { get; set; }

        public string? ClientAccountNumber { get; set; }
        public string? ProviderAccountNumber { get; set; }

        public DateTime? MarkedAsComplaintAt { get; set; }

        public string? ComplaintReason { get; set; }

        public required DateTime CreatedAt { get; set; }

        public DateTime? AcceptedAt { get; set; }

        public required GigModes Modes { get; set; }

        public required bool IsRevealedByClient { get; set; } = true;

        public override void Obscure()
        {
            Payout = -1;
            Title = REDACTED;
            Description = REDACTED;
            Category = GigCategoryNames.REDACTED;
            Subcategory = GigSubcategoryNames.REDACTED;
            Status = GigStatus.COMPLETED;
            AuthorId = REDACTED;
            AuthorName = REDACTED;
        }
    }
}
