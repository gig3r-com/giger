using Giger.Models.Networks;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Giger.Models.Logs
{
    public class Log
    {
        [JsonPropertyName("_id")]

        public string Id { get; set; } = string.Empty;

        public DateTime Timestamp { get; set; }

        public string SourceUserId { get; set; } = string.Empty;

        public string SourceUserName { get; set; } = string.Empty;

        public string? SourceHackerName { get; set; }

        public string? TargetUserId { get; set; }

        public string? TargetUserName { get; set; }

        public LogType LogType { get; set; }

        public string LogData { get; set; } = string.Empty;

        public string SubnetworkId { get; set; } = string.Empty;

        public string SubnetworkName { get; set; } = string.Empty;

        public Log() { }

        [SetsRequiredMembers]
        public Log(Log other, Subnetwork subnetwork)
        {
            Id = Guid.NewGuid().ToString();
            Timestamp = other.Timestamp;
            SourceUserId = other.SourceUserId;
            SourceUserName = other.SourceUserName;
            SourceHackerName = other.SourceHackerName;
            TargetUserId = other.TargetUserId;
            TargetUserName = other.TargetUserName;
            LogType = other.LogType;
            LogData = other.LogData;
            SubnetworkId = subnetwork.Id;
            SubnetworkName = subnetwork.Name;
        }
    }

    [JsonConverter(typeof(JsonStringEnumConverter<LogType>))]
    public enum LogType
    {
        MESSAGE,
        TRANSFER,
        SUBNETWORK_HACKED,
        SUBNETWORK_SECURITY_BREACH,
        FIRED_ICE,
        COPIED_DATA,
        SUBNETWORK_OS_CHANGED,
        SUBNETWORK_FIREWALL_CHANGED,
        SUBNETWORK_ICE_CHANGED,
        GIG_CREATED,
        GIG_ACCEPTED,
        GIG_MESSAGESENT,
        GIG_UPDATED,
        MIND_EXPLOIT_CHANGED
    }
}
