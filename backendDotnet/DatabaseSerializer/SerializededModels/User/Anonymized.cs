using MongoDB.Bson;

namespace Giger.SerializededModels.User
{
    public class Anonymized : Models.User.AnonymizedUser
    {

        public Anonymized()
        {
            Id = ObjectId.GenerateNewId().ToString();
            UserId = "123456";
            DisplyedAs = Guid.NewGuid().ToString();
        }
    }
}
