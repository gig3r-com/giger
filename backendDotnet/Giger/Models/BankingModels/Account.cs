using System.Text.Json.Serialization;

namespace Giger.Models.BankingModels
{
    public class Account
    {
        public string Id { get; set; } = string.Empty;

        public string Owner { get; set; } = string.Empty;

        public string OwnerId { get; set; } = string.Empty;

        public List<Transaction> Transactions { get; set; } = [];
        
        public AccountType Type { get; set; }

        public decimal Balance { get; set; }
        
        public string AccountNumber { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public override int GetHashCode()
        {
            int hash = 19;
            hash += 3 * Id.GetHashCode();
            foreach (var trx in Transactions)
            {
                hash += 5 * trx.GetHashCode();
            }
            hash += 7 * Type.GetHashCode();
            hash += 11 * Balance.GetHashCode();
            hash += 13 * IsActive.GetHashCode();

            return hash;
        }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<AccountType>))]
    public enum AccountType
    {
        PRIVATE,
        BUSINESS
    }
}
