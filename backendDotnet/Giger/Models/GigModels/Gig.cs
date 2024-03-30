using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.GigModels
{
    public class Gig : GigBase
    {
        [BsonRepresentation(BsonType.String)]
        public GigStatus Status { get; set; }

        public string AuthorId { get; set; }

        public string TakenById {  get; set; }
    }
}
