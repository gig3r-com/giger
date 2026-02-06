using Giger.Models.GigModels;

namespace Giger.DTOs
{
    public class GigDTO
    {
        public string Id { get; set; } = "";
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string DescriptionDetailed { get; set; } = "";
        public string Status { get; set; } = "";
        public string Category { get; set; } = "";
        public string Subcategory { get; set; } = ""; // Note: lowercase 'c'
        public ReputationRequiredDTO ReputationRequired { get; set; } = new();
        public bool IsAnonymizedAuthor { get; set; }
        public string Mode { get; set; } = "";
        public string AuthorId { get; set; } = "";
        public string AuthorName { get; set; } = ""; // Maps from AuthorHandle
        public string? ClientAccountNumber { get; set; } // Maps from AuthorAccountNumber
        public string? TakenById { get; set; } // Maps from WorkerId
        public string? ProviderAccountNumber { get; set; } // Maps from WorkerAccountNumber
        public string? ConversationId { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Payout { get; set; }
        public string? ComplaintReason { get; set; }
        public bool IsRevealed { get; set; } // Derived from IsRevealedTo
        public bool IsRevealedByClient { get; set; } // Derived from IsRevealedTo

        public static GigDTO FromModel(Gig gig, string? currentUserHandle = null)
        {
            var dto = new GigDTO
            {
                Id = gig.Id,
                Title = gig.Title ?? "",
                Description = gig.Description ?? "",
                DescriptionDetailed = gig.DescriptionDetailed ?? "",
                Status = gig.Status,
                Category = gig.Category,
                Subcategory = gig.SubCategory ?? "",
                ReputationRequired = new ReputationRequiredDTO { Level = gig.ReputationRequired },
                IsAnonymizedAuthor = gig.IsAnonymizedAuthor,
                Mode = gig.Mode,
                AuthorId = gig.AuthorId,
                AuthorName = gig.AuthorHandle,
                ClientAccountNumber = gig.AuthorAccountNumber,
                TakenById = gig.WorkerId,
                ProviderAccountNumber = gig.WorkerAccountNumber,
                ConversationId = gig.ConversationId,
                CreatedAt = gig.CreatedAt,
                Payout = gig.Payout,
                ComplaintReason = gig.ComplaintReason,
                // Default to revealed if no reveal tracking
                IsRevealed = true,
                IsRevealedByClient = true
            };

            // Calculate IsRevealed flags if we have the data
            // Access the collection once to avoid multiple enumerations
            var revealedToList = gig.IsRevealedTo;
            if (currentUserHandle != null && revealedToList != null && revealedToList.Any())
            {
                dto.IsRevealed = revealedToList.Any(r => r.UserHandle == currentUserHandle);
                dto.IsRevealedByClient = revealedToList.Any(r => r.UserHandle == gig.AuthorHandle);
            }

            return dto;
        }
    }

    public class ReputationRequiredDTO
    {
        public int Level { get; set; }
    }
}
