using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Giger.Models.BankingModels;
using Giger.Models.MessageModels;
using Giger.Models.GigModels;

namespace Giger.Connections.Payloads
{
    public class HashesPayload
    {
        HashesPayload() { }

        HashesPayload(Account privateAccount, Account businessAccount, 
            List<Conversation> userConversations, List<Conversation> gigConversationHashes, List<Gig> gigStatusHashes)
        {
            PrivateAccountHash = privateAccount.GetHashCode();
            BusinessAccountHash = businessAccount.GetHashCode();
            CoversationHashes = CalculateConversationHashes(userConversations);
            GigConversationHashes = CalculateConversationHashes(gigConversationHashes);
            GigStatusHashes = CalculateGigStatuses(gigStatusHashes);
        }

        [BsonRepresentation(BsonType.String)]
        SocketMessageType MessageType = SocketMessageType.HASH_UPDATE;

        public int PrivateAccountHash { get; set; }
        public int BusinessAccountHash { get; set; }
        public Dictionary<string, int> CoversationHashes { get; set; }
        public Dictionary<string, int> GigConversationHashes { get; set; }
        public Dictionary<string, int> GigStatusHashes { get; set; }

        private Dictionary<string, int> CalculateConversationHashes(List<Conversation> userConversations)
        {
            Dictionary<string, int> hashes = new Dictionary<string, int>();
            foreach (var conversation in userConversations)
            {
                hashes.Add(conversation.Id, conversation.GetHashCode());
            }
            return hashes;
        }

        private Dictionary<string, int> CalculateGigStatuses(List<Gig> userGigs)
        {
            Dictionary<string, int> hashes = new Dictionary<string, int>();
            foreach (var gig in userGigs)
            {
                hashes.Add(gig.Id, (int)gig.Status);
            }
            return hashes;
        }
    }
}
