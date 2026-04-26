using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.GigModels
{
    public partial class Gig
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? DescriptionDetailed { get; set; }
        public required decimal Payout { get; set; }


        public string Status { get; set; }
        public string Category { get; set; }
        public string Subcategory { get; set; }
        public int ReputationRequired { get; set; }

        public bool IsAnonymizedAuthor { get; set; }
        public string Mode { get; set; } // 'authorIsHiring' | 'authorWantsToBeHired';
        public string[] IsRevealedTo { get; set; } // user handles, author is here from start


        public string AuthorId { get; set; } // TODO: DELETE
        public string AuthorHandle { get; set; }
        //public string AuthorAccountNumber { get; set; }

        public string? WorkerId { get; set; } // TODO: DELETE
        public string? WorkerHandle { get; set; }
        public string? WorkerAccountNumber { get; set; }

        public string? ClientHandle { get; set; }
        public string? ClientAccountNumber { get; set; }

        public string? ConversationId { get; set; }
        public DateTime CreatedAt { get; set; }
        [NotMapped]
        public List<GigUpdate> Updates { get; set; }
        public string? ComplaintReason { get; set; }
    }
}
