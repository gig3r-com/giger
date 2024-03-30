using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.EventModels
{
    public class CriminalEvent : Event
    {
        [BsonRepresentation(BsonType.String)]
        public CriminalEventType? Type { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<CriminalEventType>))]
    public enum CriminalEventType
    {
        VICTIM,
        SUSPECT,
        WANTED,
        WITNESS,
        PUNISHMENT
    }
}
