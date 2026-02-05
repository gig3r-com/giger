using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.BankingModels
{
    public class AccountOwner
    {
        public required string AccountId { get; set; }
        [ForeignKey("AccountId")]
        public Account? Account { get; set; }

        public required string UserHandle { get; set; }
    }
}
