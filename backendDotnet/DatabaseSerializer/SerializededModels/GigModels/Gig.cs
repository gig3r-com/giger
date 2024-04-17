using MongoDB.Bson;

namespace Giger.SerializededModels.GigModels
{
    public class Gig : Models.GigModels.Gig
    {
        public Gig()
        {
            Id = ObjectId.GenerateNewId().ToString();
            IsRevealed = true;
            Payout = 100;
            Title = "Test Gig";
            Description = "This is a test gig.";
            Category = Models.GigModels.GigCategoryNames.INTEL;
            RepurationRequired = 1;
            IsAnonymizedAuthor = true;
            Status = Models.GigModels.GigStatus.AVAILABLE;
            AuthorId = "123456";
            AuthorName = "jsilver";
            TakenById = null;
        }
    }
}
