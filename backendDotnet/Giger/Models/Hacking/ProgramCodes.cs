using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.Hacking
{
    public class ProgramCodes
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public required string ProgramCode { get; set; }

        public required bool IsUsed { get; set; }
    }
}
