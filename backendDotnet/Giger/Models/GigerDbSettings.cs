namespace Giger.Models
{
    public class GigerDbSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;


        // Database table names
        public string UsersCollectionName { get; set; } = null!;
        public string GigsCollectionName { get; set; } = null!;
        public string TransactionsCollectionName { get; set; } = null!;
        public string AccountsCollectionName { get; set; } = null!;
        public string EventsCollectionName { get; set; } = null!;
        public string ConversationsCollectionName { get; set; } = null!;
        public string MessagesCollectionName { get; set; } = null!;
        public string NetworksCollectionName { get; set; } = null!;
        public string SubnetworksCollectionName { get; set; } = null!;
        public string AuthsCollectionName { get; set; } = null!;

    }
}
