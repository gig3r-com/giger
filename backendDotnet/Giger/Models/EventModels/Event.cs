using Giger.Models.Obscured;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.EventModels
{
    public abstract class Event : ObscurableInfo
    {
        public required string Name { get; set; }

        public required string EventDescription { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required EventStatus Status { get; set; }
        
        public DateTime? TimeStamp { get; set; }
        
    }

    [JsonConverter(typeof(JsonStringEnumConverter<EventStatus>))]
    public enum EventStatus
    {
        CURRENT,
        HISTORICAL
    }
}