using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Giger.Models.GigModels
{
    [JsonConverter(typeof(JsonStringEnumConverter<GigStatus>))]
    public enum GigStatus
    {
        [EnumMember(Value = "available")]
        AVAILABLE,
        IN_PROGRESS,
        COMPLETED,
        PENDING,
        DISPUTE
    }
}