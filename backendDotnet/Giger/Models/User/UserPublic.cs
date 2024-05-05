using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public class UserPublic
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public string? Name { get; set; }

        public required string Handle { get; set; } // username

        [BsonRepresentation(BsonType.String)]
        public UserRoles[] Roles { get; set; } = [];

        public Dictionary<string, string> AliasMap { get; set; } = [];

        public bool Active { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required UserTypes TypePublic { get; set; }

        public required string ProfessionPublic { get; set; }

        public string? FactionRankPublic{ get; set; }

        public required string Surname { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required Vibe Vibe { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required WealthLevels WealthLevel { get; set; }

        public string NetworkId { get; set; }

        public string NetworkName { get; set; }

        public string SubnetworkId { get; set; }

        public string SubnetworkName { get; set; }

        public bool HasPlatinumPass { get; set; }

        public bool HighSecurity { get; set; }

        public string ReputationDescription { get; set; }
    }
}