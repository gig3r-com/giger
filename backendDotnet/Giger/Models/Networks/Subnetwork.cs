using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.Networks
{
    public class Subnetwork
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public required string Name { get; set; }

        public required string NetworkId { get; set; }

        public required string[] Users { get; set; } = [];

        [BsonRepresentation(BsonType.String)]
        public Firewall? Firewall { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public OperatingSystem? OperatingSystem { get; set; }

        public string[] Ice { get; set; } = [];

        public string[] PastHacks { get; set; } = [];
    }

    [JsonConverter(typeof(JsonStringEnumConverter<Firewall>))]
    public enum Firewall
    {
        ENCRYPT_GUARD,
        FIREWALL_X,
        VIRTUAL_VAULT
    }

    [JsonConverter(typeof(JsonStringEnumConverter<OperatingSystem>))]
    public enum OperatingSystem
    {
        FORCE_FIELD,
        EVIL_TWIN,
        JOAN_OF_ARC
    }
}
