using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public class UserPublic
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public string Name { get; set; }

        public required string Handle { get; set; } // username

        [BsonRepresentation(BsonType.String)]
        public UserRoles[] Roles { get; set; } = []; // changeable

        public Dictionary<string, string> AliasMap { get; set; } = []; // changeable

        public bool Active { get; set; } // changeable

        [BsonRepresentation(BsonType.String)]
        public UserTypes TypePublic { get; set; } // changeable

        public string ProfessionPublic { get; set; } // changeable

        public required string Surname { get; set; }

        public int Age { get; set; }

        [BsonRepresentation(BsonType.String)]
        public Vibe Vibe { get; set; } // changeable ??

        [BsonRepresentation(BsonType.String)]
        public WealthLevels WealthLevel { get; set; }

        public required string NetworkId { get; set; }

        public required string SubnetworkId { get; set; }
    }
}