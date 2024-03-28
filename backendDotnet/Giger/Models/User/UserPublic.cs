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

        // hacker only
        public string NetworkId { get; set; }
        public string SubnetworkId { get; set; }
        public string[] Exploits { get; set; }
        public MindHacks MindHack { get; set; }
        public string HackerName { get; set; } // changeable
    }
}
