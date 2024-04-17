using MongoDB.Bson;

namespace Giger.SerializededModels.User
{
    public class AnonymizedUser : Models.User.AnonymizedUser
    {

        public AnonymizedUser()
        {
            Id = ObjectId.GenerateNewId().ToString();
            UserId = "123456";
            DisplyedAs = Guid.NewGuid().ToString();
        }
    }
}
