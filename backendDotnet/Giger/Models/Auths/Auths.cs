using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Auths
{
    public class Auths
    {
        [BsonId]
        public int Id { get; set; }
        
        public string Username { get; set; } // UserBase.Handle
        
        public string Password { get; set; }
        
        public string? AuthToken { get; set; }
    }
}
