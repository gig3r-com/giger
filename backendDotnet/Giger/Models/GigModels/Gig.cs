using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.GigModels
{
    public class Gig
    {
        [BsonId]
        public string Id { get; set; }

        public decimal Payout { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        [BsonRepresentation(BsonType.String)]
        public GigCategoryNames Category { get; set; }

        public GigRepuationLevels? RepurationRequired { get; set; }

        public bool? AnonymizedAuthor { get; set; }
        [BsonRepresentation(BsonType.String)]
        public GigStatus Status { get; set; }

        public string AuthorId { get; set; }

        public string TakenById {  get; set; }
    }
}
