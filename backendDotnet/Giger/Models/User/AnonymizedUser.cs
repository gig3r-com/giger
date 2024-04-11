using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public class AnonymizedUser
    {
        [BsonId]
        public required string Id { get; set; }

        public required string UserId {  get; set; }

        public required string DisplyedAs { get; set; }
    }
}
