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
        public UserRoles[] Roles { get; set; } = []; // changeable

        public Dictionary<string, string> AliasMap { get; set; } = []; // changeable

        public bool Active { get; set; } // changeable

        [BsonRepresentation(BsonType.String)]
        public required UserTypes TypePublic { get; set; } // changeable

        public required string ProfessionPublic { get; set; } // changeable

        public required string Surname { get; set; }

        public required int Age { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required Vibe Vibe { get; set; } // changeable ??

        [BsonRepresentation(BsonType.String)]
        public required WealthLevels WealthLevel { get; set; }

        public required string NetworkId { get; set; }

        public required string SubnetworkId { get; set; }
    }
}