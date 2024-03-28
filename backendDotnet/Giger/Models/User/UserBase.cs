using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public abstract class UserBase
    {
        [BsonId]
        public string Id { get; set; }
        public string Name { get; set; }
        public Dictionary<string, string> AliasMap { get; set; }
        public bool Active { get; set; }
        public string Handle { get; set; } // username
        public UserRoles[] Roles { get; set; } = Array.Empty<UserRoles>(); // changeable
    }
}
