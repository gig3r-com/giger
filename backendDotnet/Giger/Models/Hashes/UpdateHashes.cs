using Giger.Models.BankingModels;
using Giger.Models.MessageModels;
using Giger.Models.GigModels;

namespace Giger.Models.Hashes
{
    public class UpdateHashes
    {
        public UpdateHashes(Account privateAccount, Account businessAccount,
            List<Conversation> userConversations, List<Conversation> gigConversationHashes, List<Gig> gigStatusHashes)
        {
            PrivateAccountTransactionsHashes = CalculateTransactionsHashes(privateAccount.Transactions);
            BusinessAccountTransactionsHashes = CalculateTransactionsHashes(businessAccount.Transactions);
            CoversationHashes = CalculateConversationHashes(userConversations);
            GigConversationHashes = CalculateConversationHashes(gigConversationHashes);
            GigStatusHashes = CalculateGigStatuses(gigStatusHashes);
        }

        
        public Dictionary<string, int> PrivateAccountTransactionsHashes { get; set; }
        public Dictionary<string, int> BusinessAccountTransactionsHashes { get; set; }
        public Dictionary<string, int> CoversationHashes { get; set; }
        public Dictionary<string, int> GigConversationHashes { get; set; }
        public Dictionary<string, int> GigStatusHashes { get; set; }

        private Dictionary<string, int> CalculateTransactionsHashes(List<Transaction> transactions)
        {
            Dictionary<string, int> hashes = [];
            foreach (var transaction in transactions)
            {
                hashes.Add(transaction.Id, transaction.GetHashCode());
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
