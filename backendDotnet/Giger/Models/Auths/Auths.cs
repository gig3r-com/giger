using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Auths
{
    public class Auths
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public required string Username { get; set; } // UserBase.Handle

        public required string Password { get; set; }
        
        public string? AuthToken { get; set; }
    }
}
