using MongoDB.Bson;

namespace Giger.SerializededModels.Auths
{
    public class Auths : Models.Auths.Auths
    {
        public Auths()
        {
            Id = ObjectId.GenerateNewId().ToString();
            Username = "jsilver";
            Password = "passWORD";
            AuthToken = null;
        }
    }
}
