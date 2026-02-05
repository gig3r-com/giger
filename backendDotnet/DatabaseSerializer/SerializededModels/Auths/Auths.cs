namespace Giger.SerializededModels.Auths
{
    public class Auths
    {
        public Models.Auths.Auth[] AuthsTable { get; set; }

        public Auths()
        {
            AuthsTable = [
                new Models.Auths.Auth
                {
                    Id = Guid.NewGuid().ToString(),
                    Username = "jsilver",
                    Password = "passWORD",
                    HackerName = null,
                    AuthToken = null
                },
                new Models.Auths.Auth
                {
                    Id = Guid.NewGuid().ToString(),
                    Username = "triddle",
                    Password = "voldemort",
                    HackerName = "voldemort",
                    AuthToken = null
                },
            ];
        }
    }
}
