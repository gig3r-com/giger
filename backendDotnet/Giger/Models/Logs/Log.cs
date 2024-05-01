using Giger.Models.Networks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Giger.Models.Logs
{
    public class Log
    {
        [BsonId]
        [BsonElement("_id")]
        public required string Id { get; set; }

        public DateTime Timestamp { get; set; }

        public required string SourceUserId { get; set; }

        public required string SourceUserName { get; set; }

        public string? SourceHackerName { get; set; }

        public string? TargetUserId { get; set; }

        public string? TargetUserName { get; set; }

        [BsonRepresentation(BsonType.String)]
        public required LogType LogType { get; set; }

        public required string LogData { get; set; }

        public required string SubnetworkId { get; set; }

        public required string SubnetworkName { get; set; }

        public Log() { }

        [SetsRequiredMembers]
        public Log(Log other, Subnetwork subnetwork)
        {
            Id = ObjectId.GenerateNewId().ToString();
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
        Message,
        Transfer,
        SubnetworkHacked,
        SubnetworkSecurityBreach,
        [BsonElement("Fired ICE")]
        FiredIce,
        CopiedData,
        SubnetworkOsChanged,
        SubnetworkFirewallChanged,
        SubnetworkIceChanged,
        GigCreated,
        GigAccepted,
        GigMessageSent,
        MindExploitChanged

    }
}
