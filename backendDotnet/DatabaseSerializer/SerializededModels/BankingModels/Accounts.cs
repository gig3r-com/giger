using Giger.Models.BankingModels;
using Giger.Models.User;
using MongoDB.Bson;

namespace Giger.SerializededModels.BankingModels
{
    public class Accounts
    {
        public Account[] AccountTable { get; set; }

        public Accounts()
        {
            var tid1 = ObjectId.GenerateNewId().ToString();
            var t1 = GigerDateTime.Now;

            var tid2 = ObjectId.GenerateNewId().ToString();
            var t2 = GigerDateTime.Now.AddHours(1).AddMinutes(6);

            var tid3 = ObjectId.GenerateNewId().ToString();
            var t3 = GigerDateTime.Now.AddHours(-120).AddMinutes(6);

            AccountTable = [
                new Account()
                {
                    Id = "SYSTEM",
                    Owner = "SYSTEM",
                    OwnerId = "SYSTEM",
                    Transactions = [
                        new()
                        {
                            Id = tid3,
                            To = "SYSTEM",
                            From = "501234",
                            Date = t3,
                            Title = "Funds reserved for Gig_1",
                            Amount = 100,
                        }
                    ],
                    Type = AccountType.PRIVATE,
                    Balance = 100100,
                    AccountNumber = "SYSTEM",
                },
                new Account()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Owner = "jsilver",
                    OwnerId = "123456",
                    Transactions = [
                        new()
                        {
                            Id = tid1,
                            To = "501234",
                            From = "504321",
                            Date = t1,
                            Title = "Gig",
                            Amount = 1000,
                        },
                        new()
                        {
                            Id = tid2,
                            To = "504321",
                            From = "501234",
                            Date = t2,
                            Title = "Payment",
                            Amount = 123,
                        },
                        new()
                        {
                            Id = tid3,
                            To = "SYSTEM",
                            From = "501234",
                            Date = t3,
                            Title = "Funds reserved for Gig_1",
                            Amount = 100,
                        }
                    ],
                    Type = AccountType.PRIVATE,
                    Balance = 1777,
                    AccountNumber = "501234",
                },

                new Account()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Owner = Factions.Gunners.ToString(),
                    OwnerId = "123456",
                    Transactions = [ ],
                    Type = AccountType.BUSINESS,
                    Balance = 10000,
                    AccountNumber = "200001",
                },

                new Account()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Owner = "triddle",
                    OwnerId = "123457",
                    Transactions = [
                        new()
                        {
                            Id = tid1,
                            To = "501234",
                            From = "504321",
                            Date = t1,
                            Title = "Gig",
                            Amount = 1000,
                        },
                        new()
                        {
                            Id = tid2,
                            To = "504321",
                            From = "501234",
                            Date = t2,
                            Title = "Payment",
                            Amount = 123,
                        }
                    ],
                    Type = AccountType.PRIVATE,
                    Balance = 1123,
                    AccountNumber = "504321",
                },
            ];
        }
    }
}
