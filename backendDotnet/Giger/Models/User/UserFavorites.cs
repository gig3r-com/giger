using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public class UserFavorites
    {
        [BsonId]
        Guid Id { get; set; }
        UserPrivate UserId { get; set; }
        UserPrivate FavoriteUserId { get; set; }
    }
}
