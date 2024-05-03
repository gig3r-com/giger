﻿using Giger.Controllers;
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
            var time1 = GigerDateTime.Now;
            var time2 = GigerDateTime.Now.AddHours(1).AddMinutes(6);
            var time3 = GigerDateTime.Now.AddHours(-120).AddMinutes(6);

            AccountTable = [
                new Account()
                {
                    Id = "SYSTEM",
                    Owner = "SYSTEM",
                    OwnerId = "SYSTEM",
                    Transactions = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            To = "SYSTEM",
                            From = "501234",
                            Date = time3,
                            Title = "Funds reserved for Gig_1",
                            Amount = 100,
                        }
                    ],
                    Type = AccountType.BUSINESS,
                    Balance = 100100,
                    AccountNumber = "SYSTEM",
                },

                new Account()
                {
                    Id = "SOCIAL",
                    Owner = "SOCIAL",
                    OwnerId = "SOCIAL",
                    Transactions = [],
                    Type = AccountType.BUSINESS,
                    Balance = 100000,
                    AccountNumber = "9950147",
                },

                new Account()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Owner = Factions.Gunners.ToString(),
                    OwnerId = Factions.Gunners.ToString(),
                    Transactions = [],
                    Type = AccountType.BUSINESS,
                    Balance = 10000,
                    AccountNumber = "9944444",
                },

                new Account()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Owner = "jsilver",
                    OwnerId = "123456",
                    Transactions = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            To = "501234",
                            From = "504321",
                            Date = time1,
                            Title = "Gig",
                            Amount = 1000,
                        },
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            To = "504321",
                            From = "501234",
                            Date = time2,
                            Title = "Payment",
                            Amount = 123,
                        },
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            To = "SYSTEM",
                            From = "501234",
                            Date = time3,
                            Title = string.Format(Messages.GIG_RESERVE_FUNDS_TRANSACTION_TITLE, "Gather intel"),
                            Amount = 1000,
                        }
                    ],
                    Type = AccountType.PRIVATE,
                    Balance = 1777,
                    AccountNumber = "501234",
                },

                new Account()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Owner = "triddle",
                    OwnerId = "123457",
                    Transactions = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            To = "501234",
                            From = "504321",
                            Date = time1,
                            Title = "Gig",
                            Amount = 1000,
                        },
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            To = "504321",
                            From = "501234",
                            Date = time2,
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
