using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.BankingModels
{
    public class Account
    {
        public required string Id { get; set; }

        public List<string> Owners { get; set; }

        public string Name { get; set; }

        [NotMapped]
        public List<Transaction> Transactions { get; set; }

        public string Type { get; set; } // PRIVATE or BUSINESS

        public decimal Balance { get; set; }
        
        public string AccountNumber { get; set; }

        public override int GetHashCode()
        {
            int hash = 19;
            hash += 3 * Id.GetHashCode();
            foreach (var trx in Transactions)
            {
                hash += 5 * trx.GetHashCode();
            }
            hash += 7 * Type.GetHashCode();
            hash += 11 * AccountNumber.GetHashCode();
            hash += 13 * Name.GetHashCode();
            hash += 17 * Balance.GetHashCode();

            return hash;
        }
        
        public const string PRIVATE_ACCOUNT_TYPE = "PRIVATE";
        public const string BUSINESS_ACCOUNT_TYPE = "BUSINESS";
    }


    //[JsonConverter(typeof(JsonStringEnumConverter<AccountType>))]
    //public enum AccountType
    //{
    //    PRIVATE,
    //    BUSINESS
    //}
}
