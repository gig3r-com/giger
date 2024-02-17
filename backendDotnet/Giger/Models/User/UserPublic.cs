using static Giger.Models.UserModels.UserPrivate;

namespace Giger.Models.User
{
    public class UserPublic : UserBase
    {
        public UserTypes TypePublic { get; set; }
        public string ProfessionPublic { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public Vibe Vibe { get; set; }
        public WealthLevels WealthLevel { get; set; }

    }
}
