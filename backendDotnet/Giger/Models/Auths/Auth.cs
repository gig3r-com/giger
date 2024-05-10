using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Auths
{
    public class Auth
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public required string Username { get; set; } // UserPublic.Handle

        public string? HackerName { get; set; } // UserPrivate.HackerName

        public required string Password { get; set; }
        
        public string? AuthToken { get; set; }
    }
}
