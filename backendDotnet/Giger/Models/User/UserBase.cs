using MongoDB.Bson.Serialization.Attributes;
using static Giger.Models.UserModels.UserPrivate;

namespace Giger.Models.User
{
    public abstract class UserBase
    {
        [BsonId]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Handle { get; set; }
        public UserRoles[]? Roles { get; set; }
        public Dictionary<string, string> AliasMap { get; set; }
        public bool Active { get; set; }
    }
}
