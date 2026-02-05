using System.Text.Json.Serialization;

namespace Giger.Models.BankingModels
{
    public class Account
    {
        public string Id { get; set; } = string.Empty;

        /// <summary>
        /// List of user handles who own this account
        /// </summary>
        public List<string> Owners { get; set; } = [];

        /// <summary>
        /// Legacy single owner field - kept for backwards compatibility
        /// </summary>
        public string Owner
        {
            get => Owners.FirstOrDefault() ?? string.Empty;
            set
            {
                if (!string.IsNullOrEmpty(value) && !Owners.Contains(value))
                {
                    Owners.Add(value);
                }
            }
        }

        [JsonPropertyName("OwnerId")]
        public string? OwnerId { get; set; }

        /// <summary>
        /// Optional name for business accounts
        /// </summary>
        public string? Name { get; set; }

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
