using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public abstract class UserBase
    {
        [BsonId]
        public string Id { get; set; }
        
        public string Name { get; set; }
        
        public string Handle { get; set; } // username
        
        [BsonRepresentation(BsonType.String)]
        public UserRoles[] Roles { get; set; } = []; // changeable
        
        public Dictionary<string, string> AliasMap { get; set; } // changeable
        
        public bool Active { get; set; } // changeable
    }
}
