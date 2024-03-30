using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public class AnonymizedUser
    {
        [BsonId]
        public string Id { get; set; }

        public string UserId {  get; set; }

        public string DisplyedAs { get; set; }
    }
}
