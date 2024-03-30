using System.Text.Json.Serialization;

namespace Giger.Models.MessageModels
{
    [JsonConverter(typeof(JsonStringEnumConverter<MessageStatus>))]
    public enum MessageStatus
    {
        SENT,
        RECEIVED,
        READ,
        ERROR,
        AWAITING,
    }
}