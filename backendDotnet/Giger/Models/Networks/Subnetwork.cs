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
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement("EncryptGuard")]
        EncryptGuard,
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement("FirewallX")]
        FirewallX,
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement("VirtualVault")]
        VirtualVault
    }

    public enum OperatingSystem
    {
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement("ForceField")]
        ForceField,
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement("EvilTwin")]
        EvilTwin,
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonElement("JoanOfArc")]
        JoanOfArc
    }

    public enum Ice
    {

    }
}
