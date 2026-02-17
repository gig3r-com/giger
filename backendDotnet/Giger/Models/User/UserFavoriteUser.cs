using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.User
{
    public class UserFavoriteUser
    {
        public required string UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }

        public required string FavoriteUserHandle { get; set; }
    }
}
