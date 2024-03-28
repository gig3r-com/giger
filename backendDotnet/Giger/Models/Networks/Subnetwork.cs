using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Networks
{
    public class Subnetwork
    {
        [BsonId]
        public string Id { get; set; }
        public string Name { get; set; }
        public string NetworkId { get; set; }
        public string[] Users { get; set; }
        public Firewall Firewall { get; set; }
        public OperatingSystem OperatingSystem { get; set; }
        public Ice[] Ice { get; set; }
        public string[] PastHacks { get; set; }
    }

    public enum Firewall
    {
        EncryptGuard,
        FirewallX,
        VirtualVault
    }

    public enum OperatingSystem
    {
        ForceShield,
        EvilTwin,
        JoanOfArc
    }

    public enum Ice
    {

    }
}
