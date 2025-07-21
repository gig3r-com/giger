using Giger.Models.Obscured;
using System.Text.Json.Serialization;

namespace Giger.Models.EventModels
{
    public abstract class Event : ObscurableInfo
    {
        public required string Name { get; set; }

        public required string EventDescription { get; set; }

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