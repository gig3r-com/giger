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
                    Payout = 100,
                    Title = "Gather intel",
                    ConversasionId = "789336",
                    Description = "Will gather any intel you need",
                    Category = GigCategoryNames.FIXER,
                    Subcategory = GigSubcategoryNames.INTEL,
                    RepurationRequired = 0,
                    IsAnonymizedAuthor = true,
                    Status = GigStatus.IN_PROGRESS,
                    AuthorId = "123456",
                    AuthorName = "jsilver",
                    TakenById = "123457",
                    IsRevealedByClient = true,
                    TakenForCompany = null,
                    MarkedAsComplaintAt = null,
                    ComplaintReason = null,
                    CreatedAt = GigerDateTime.Now.AddHours(-1),
                    AcceptedAt = GigerDateTime.Now,
                    Modes = GigModes.PROVIDER,
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
                    ConversasionId = null,
                    Category = GigCategoryNames.WELLBEING,
                    Subcategory = GigSubcategoryNames.MEDEVAC,
                    RepurationRequired = 1,
                    IsAnonymizedAuthor = true,
                    Status = GigStatus.COMPLETED,
                    AuthorId = "123457",
                    AuthorName = "triddle",
                    TakenById = "123456",
                    IsRevealedByClient = false,
                    TakenForCompany = null,
                    MarkedAsComplaintAt = null,
                    ComplaintReason = null,
                    CreatedAt = GigerDateTime.Now.AddHours(-37),
                    AcceptedAt = GigerDateTime.Now.AddDays(-1),
                    Modes = GigModes.CLIENT,
                    ProviderAccountNumber = "501234",
                    ClientAccountNumber = "504321",
                },
                new Gig()
                {
                    Id = "3",
                    IsRevealed = true,
                    Payout = 100,
                    Title = "Hijack android",
                    Description = "Android #1532 needs to be brought back to its rightful owner",
                    ConversasionId = null,
                    Category = GigCategoryNames.KILLER,
                    Subcategory = GigSubcategoryNames.ANDROID_HIJACK,
                    RepurationRequired = 2,
                    IsAnonymizedAuthor = true,
                    Status = GigStatus.AVAILABLE,
                    AuthorId = "123456",
                    AuthorName = "6628dfb2d33520d5b9321f9d",
                    TakenById = null,
                    IsRevealedByClient = true,
                    TakenForCompany = null,
                    MarkedAsComplaintAt = null,
                    ComplaintReason = null,
                    CreatedAt = GigerDateTime.Now,
                    AcceptedAt = null,
                    Modes = GigModes.CLIENT,
                    ClientAccountNumber = "501234",
                    ProviderAccountNumber = null
                },
            ];
        }
    }
}
