using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.BankingModels
{
    public class Account
    {
        public required string Id { get; set; }

        private string _type;
        public string Type // PRIVATE or BUSINESS
        { 
            get { return _type; }
            set
            {
                if (value.Equals(PRIVATE_ACCOUNT_TYPE, StringComparison.OrdinalIgnoreCase))
                {
                    _type = PRIVATE_ACCOUNT_TYPE;
                }
                if (value.Equals(BUSINESS_ACCOUNT_TYPE, StringComparison.OrdinalIgnoreCase))
                {
                    _type = BUSINESS_ACCOUNT_TYPE;
                }
                else
                {
                    _type = value;
                }
            }
        } 

        public string Name { get; set; }

        public string AccountNumber { get; set; }

        public decimal Balance { get; set; }

        public List<string> Owners { get; set; }

        [NotMapped] 
        public List<Transaction> Transactions { get; set; }

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
