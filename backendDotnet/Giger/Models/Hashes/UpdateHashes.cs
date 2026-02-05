using Giger.Models.BankingModels;
using Giger.Models.GigModels;
using Giger.Models.MessageModels;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.Hashes
{
    [Keyless]
    public class UpdateHashes
    {
        public UpdateHashes() 
        {
            PrivateAccountTransactionsHashes = new Dictionary<string, int>();
            BusinessAccountTransactionsHashes = new Dictionary<string, int>();
            CoversationHashes = new Dictionary<string, int>();
            GigConversationHashes = new Dictionary<string, int>();
            GigStatusHashes = new Dictionary<string, int>();
        }

        public UpdateHashes(Account privateAccount, Account businessAccount,
            List<Conversation> userConversations, List<Conversation> gigConversationHashes, List<Gig> gigStatusHashes)
        {
            PrivateAccountTransactionsHashes = CalculateTransactionsHashes(privateAccount?.Transactions);
            BusinessAccountTransactionsHashes = CalculateTransactionsHashes(businessAccount?.Transactions);
            CoversationHashes = CalculateConversationHashes(userConversations);
            GigConversationHashes = CalculateConversationHashes(gigConversationHashes);
            GigStatusHashes = CalculateGigStatuses(gigStatusHashes);
        }

        [NotMapped]
        public Dictionary<string, int> PrivateAccountTransactionsHashes { get; set; }
        [NotMapped]
        public Dictionary<string, int> BusinessAccountTransactionsHashes { get; set; }
        [NotMapped]
        public Dictionary<string, int> CoversationHashes { get; set; }
        [NotMapped]
        public Dictionary<string, int> GigConversationHashes { get; set; }
        [NotMapped]
        public Dictionary<string, int> GigStatusHashes { get; set; }

        private Dictionary<string, int> CalculateTransactionsHashes(List<Transaction> transactions)
        {
            Dictionary<string, int> hashes = [];
            if (transactions != null) 
            {
                foreach (var transaction in transactions)
                {
                    hashes.Add(transaction.Id, transaction.GetHashCode());
                }
            }
            return hashes;
        }

        private Dictionary<string, int> CalculateConversationHashes(List<Conversation> userConversations)
        {
            Dictionary<string, int> hashes = [];
            foreach (var conversation in userConversations)
            {
                hashes.Add(conversation.Id, conversation.GetHashCode());
            }
            return hashes;
        }

        private Dictionary<string, int> CalculateGigStatuses(List<Gig> userGigs)
        {
            Dictionary<string, int> hashes = [];
            foreach (var gig in userGigs)
            {
                hashes.Add(gig.Id, 41 + 43 * (int)gig.Status);
            }
            return hashes;
        }
    }
}
