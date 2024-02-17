using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.GigModels
{
    public class GigBase
    {
        [BsonId]
        public int Id { get; set; }
        public decimal Payout { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public GigCategoryNames Category {  get; set; }
        public GigRepuationLevels? RepurationRequired { get; set; }
        public bool? AnonymizedAuthor { get; set; }
    }
}
