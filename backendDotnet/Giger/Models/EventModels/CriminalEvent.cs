using System.Text.Json.Serialization;

namespace Giger.Models.EventModels
{
    public class CriminalEvent : Event
    {
        public required CriminalEventType? Type { get; set; }
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
