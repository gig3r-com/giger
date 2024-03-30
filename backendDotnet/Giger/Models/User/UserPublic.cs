using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.User
{
    public class UserPublic : UserBase
    {
        [BsonRepresentation(BsonType.String)]
        public UserTypes TypePublic { get; set; } // changeable

        public string ProfessionPublic { get; set; } // changeable

        public string Surname { get; set; }

        public int Age { get; set; }

        [BsonRepresentation(BsonType.String)]
        public Vibe Vibe { get; set; } // changeable ??

        [BsonRepresentation(BsonType.String)]
        public WealthLevels WealthLevel { get; set; }

        // hacker only:
        public string NetworkId { get; set; }

        public string SubnetworkId { get; set; }

        public string[] Exploits { get; set; }
        
        [BsonRepresentation(BsonType.String)]
        public MindHacks MindHack { get; set; }

        public string HackerName { get; set; } // changeable
    }
}
