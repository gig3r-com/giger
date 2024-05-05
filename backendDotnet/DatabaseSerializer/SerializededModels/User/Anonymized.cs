using Giger.Models.User;
using MongoDB.Bson;

namespace Giger.SerializededModels.User
{
    public class Anonymized
    {
        public AnonymizedUser[] AnonymizedUserTable { get;set; }

        public Anonymized()
        {
            AnonymizedUserTable = [
                new AnonymizedUser()
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = "123456",
                    DisplyedAs = "6628dfb2d33520d5b9321f9d",
                }
            ];
        }
    }
}
