using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Giger.Models.EventModels
{
    public class Event : ObscurableInfo
    {

        [BsonId]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string EventDescription { get; set; }
        public EventStatus Status { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Name { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<EventStatus>))]
    public enum EventStatus
    {
        CURRENT,
        HISTORICAL
    }
}