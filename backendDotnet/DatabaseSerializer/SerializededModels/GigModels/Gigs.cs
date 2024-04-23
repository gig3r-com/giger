using MongoDB.Bson;

namespace Giger.SerializededModels.GigModels
{
    public class Gigs : Models.GigModels.Gig
    {
        public Gigs()
        {
            Id = "987456";
            IsRevealed = false;
            Payout = 100;
            Title = "Test Gig";
            Description = "This is a test gig.";
            Category = Models.GigModels.GigCategoryNames.INTEL;
            RepurationRequired = 1;
            IsAnonymizedAuthor = true;
            Status = Models.GigModels.GigStatus.COMPLETED;
            AuthorId = "123456";
            AuthorName = "jsilver";
            TakenById = null;
            IsRevealedByClient = false;
        }
    }
}
