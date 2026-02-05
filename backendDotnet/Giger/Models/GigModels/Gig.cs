using Giger.Models.Obscured;

namespace Giger.Models.GigModels
{
    public class Gig : ObscurableInfo
    {
        public decimal Payout { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? ConversationId { get; set; }

        public GigCategoryNames Category { get; set; }

        public GigSubcategoryNames Subcategory { get; set; }

        public GigRepuationLevels ReputationRequired { get; set; }

        public bool IsAnonymizedAuthor { get; set; }

        public GigStatus Status { get; set; }

        public string? AuthorId { get; set; }

        public string AuthorName { get; set; } = string.Empty;

        public string? TakenById { get; set; }

        /// <summary>
        /// Handle of the worker who took this gig
        /// </summary>
        public string? WorkerHandle { get; set; }

        public string? ClientAccountNumber { get; set; }

        public string? ProviderAccountNumber { get; set; }

        public DateTime? MarkedAsComplaintAt { get; set; }

        public string? ComplaintReason { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? AcceptedAt { get; set; }

        public GigModes Mode { get; set; }

        public bool IsRevealedByClient { get; set; } = true;

        /// <summary>
        /// List of user handles that this gig is revealed to
        /// </summary>
        public List<string>? IsRevealedTo { get; set; }

        public string? DescriptionDetailed { get; set; }

        /// <summary>
        /// Collection of status updates for this gig
        /// </summary>
        public List<GigUpdate>? Updates { get; set; }

        public override void Obscure()
        {
            Payout = -1;
            Title = REDACTED;
            Description = REDACTED;
            DescriptionDetailed = REDACTED;
            ConversationId = null;
            Category = GigCategoryNames.REDACTED;
            Subcategory = GigSubcategoryNames.REDACTED;
            AuthorName = REDACTED;
            ComplaintReason = ComplaintReason == null ? null : REDACTED;
        }

        public const string ANONIMIZED = "AnoNyMUS";
    }
}
