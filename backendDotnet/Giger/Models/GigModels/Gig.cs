using System.ComponentModel.DataAnnotations;

namespace Giger.Models.GigModels
{
    public class Gig
    {
        [Key]
        public required string Id { get; set; }

        public required string Title { get; set; }

        public string? Description { get; set; }

        public string? DescriptionDetailed { get; set; }

        public required string Status { get; set; }

        public required string Category { get; set; }

        public string? SubCategory { get; set; }

        public required int ReputationRequired { get; set; }

        public bool IsAnonymizedAuthor { get; set; }

        public required string Mode { get; set; } // authorIsHiring, authorWantsToBeHired

        public required string AuthorId { get; set; }

        public required string AuthorHandle { get; set; }

        public string? AuthorAccountNumber { get; set; }

        public string? WorkerId { get; set; }

        public string? WorkerHandle { get; set; }

        public string? WorkerAccountNumber { get; set; }

        public string? ConversationId { get; set; }

        public required DateTime CreatedAt { get; set; }

        public decimal Payout { get; set; }

        public string? ComplaintReason { get; set; }

        // Navigation
        public List<GigRevealedTo> IsRevealedTo { get; set; } = [];
        public List<GigUpdate> Updates { get; set; } = [];

        public const string ANONIMIZED = "AnoNyMUS";
    }
}
