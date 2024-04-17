using MongoDB.Bson;

namespace Giger.SerializededModels.BankingModels
{
    public class Account : Models.BankingModels.Account
    {
        public Account()
        {
            Id = ObjectId.GenerateNewId().ToString();
            Owner = "jsilver";
            OwnerId = "123456";
            Transactions = [
                new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    To = "501234",
                    From = "504321",
                    Date = DateTime.Now,
                    Amount = 1000,
                },
                new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    To = "504321",
                    From = "501234",
                    Date = DateTime.Now.AddHours(1),
                    Amount = 123,
                }
            ];
            Type = Models.BankingModels.AccountType.PRIVATE;
            Balance = 1000;
            AccountNumber = "501234";
        }
    }
}
