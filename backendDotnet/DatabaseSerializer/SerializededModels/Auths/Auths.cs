using MongoDB.Bson;

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
                    Id = ObjectId.GenerateNewId().ToString(),
                    Username = "jsilver",
                    Password = "passWORD",
                    AuthToken = null
                },
                new Models.Auths.Auth
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Username = "triddle",
                    Password = "voldemort",
                    AuthToken = null
                },
            ];
        }
    }
}
