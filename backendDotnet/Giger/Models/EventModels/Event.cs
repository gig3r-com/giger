using Giger.Models.Obscured;
using System.Text.Json.Serialization;

namespace Giger.Models.EventModels
{
    public abstract class Event : ObscurableInfo
    {
        public string Name { get; set; } = string.Empty;

        public string EventDescription { get; set; } = string.Empty;

        public EventStatus Status { get; set; }
        
        public DateTime? TimeStamp { get; set; }
        
    }

    [JsonConverter(typeof(JsonStringEnumConverter<EventStatus>))]
    public enum EventStatus
    {
        CURRENT,
        HISTORICAL
    }
}