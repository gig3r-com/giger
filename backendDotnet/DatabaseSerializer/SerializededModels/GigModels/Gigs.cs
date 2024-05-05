using Giger.Models.GigModels;

namespace Giger.SerializededModels.GigModels
{
    public class Gigs
    {
        public Gig[] GigsTable { get; set; }

        public Gigs()
        {
            GigsTable = [ 
                new Gig()
                {
                    Id = "1",
                    IsRevealed = true,
                    Payout = 1000,
                    Title = "Gather intel",
                    ConversationId = "789336",
                    Description = "Will gather any intel you need",
                    Category = GigCategoryNames.FIXER,
                    Subcategory = GigSubcategoryNames.INTEL,
                    ReputationRequired = 0,
                    IsAnonymizedAuthor = true,
                    Status = GigStatus.IN_PROGRESS,
                    AuthorId = "123456",
                    AuthorName = "jsilver",
                    TakenById = "123457",
                    IsRevealedByClient = true,
                    MarkedAsComplaintAt = null,
                    ComplaintReason = null,
                    CreatedAt = GigerDateTime.Now.AddHours(-1),
                    AcceptedAt = GigerDateTime.Now,
                    Mode = GigModes.PROVIDER,
                    ProviderAccountNumber = "501234",
                    ClientAccountNumber = "504321",
                },
                new Gig()
                {
                    Id = "2",
                    IsRevealed = false,
                    Payout = 100,
                    Title = "Test Gig",
                    Description = "This is a test gig.",
                    ConversationId = "987987",
                    Category = GigCategoryNames.WELLBEING,
                    Subcategory = GigSubcategoryNames.MEDEVAC,
                    ReputationRequired = 1,
                    IsAnonymizedAuthor = true,
                    Status = GigStatus.COMPLETED,
                    AuthorId = "123457",
                    AuthorName = "triddle",
                    TakenById = "123456",
                    IsRevealedByClient = false,
                    MarkedAsComplaintAt = null,
                    ComplaintReason = null,
                    CreatedAt = GigerDateTime.Now.AddHours(-37),
                    AcceptedAt = GigerDateTime.Now.AddDays(-1),
                    Mode = GigModes.CLIENT,
                    ProviderAccountNumber = "501234",
                    ClientAccountNumber = "504321",
                },
                new Gig()
                {
                    Id = "3",
                    IsRevealed = true,
                    Payout = 5000,
                    Title = "Hijack android",
                    Description = "Android #1532 needs to be brought back to its rightful owner",
                    ConversationId = "1789336",
                    Category = GigCategoryNames.KILLER,
                    Subcategory = GigSubcategoryNames.ANDROID_HIJACK,
                    ReputationRequired = 2,
                    IsAnonymizedAuthor = true,
                    Status = GigStatus.AVAILABLE,
                    AuthorId = "123456",
                    AuthorName = "6628dfb2d33520d5b9321f9d",
                    TakenById = null,
                    IsRevealedByClient = true,
                    MarkedAsComplaintAt = null,
                    ComplaintReason = null,
                    CreatedAt = GigerDateTime.Now,
                    AcceptedAt = null,
                    Mode = GigModes.CLIENT,
                    ClientAccountNumber = "501234",
                    ProviderAccountNumber = null
                },
            ];
        }
    }
}
