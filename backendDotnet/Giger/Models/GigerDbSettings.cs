namespace Giger.Models
{
    public class GigerDbSettings
    {
        public string Host { get; set; } = null!;
        public int Port { get; set; } = 27017;
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;

        // Database table names
        public string AccountsCollectionName { get; set; } = null!;
        public string AnonymizedCollectionName { get; set; } = null!;
        public string AuthsCollectionName { get; set; } = null!;
        public string ConversationsCollectionName { get; set; } = null!;
        public string GigsCollectionName { get; set; } = null!;
        public string GigerConfigsCollectionName { get; set; } = null!;
        public string HackConfigCollectionName { get; set; } = null!;
        public string ImplantsCollectionName { get; set; } = null!;
        public string LogsCollectionName { get; set; } = null!;
        public string NetworksCollectionName { get; set; } = null!;
        public string ObscuredCodesMapCollectionName { get; set; } = null!;
        public string ProgramCodesCodesMapCollectionName { get; set; } = null!;
        public string SubnetworksCollectionName { get; set; } = null!;
        public string UsersCollectionName { get; set; } = null!;
    }
}
