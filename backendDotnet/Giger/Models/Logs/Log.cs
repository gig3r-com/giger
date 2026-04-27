using Giger.Models.Networks;
using System.Diagnostics.CodeAnalysis;

namespace Giger.Models.Logs
{
    public class Log
    {
        public string Id { get; set; }

        public DateTime Timestamp { get; set; }

        public string SourceUser { get; set; }

        public string TargetUser { get; set; }

        public string LogType { get; set; }

        public string LogData { get; set; }

        public string Subnetwork { get; set; }

        public Dictionary<string, string> HackData { get; set; }

        public Log() { }

        [SetsRequiredMembers]
        public Log(Log other, Subnetwork subnetwork)
        {
            Id = Guid.NewGuid().ToString();
            Timestamp = other.Timestamp;
            SourceUser = other.SourceUser;
            TargetUser = other.TargetUser;
            LogType = other.LogType;
            LogData = other.LogData;
            Subnetwork = subnetwork.Name;
        }
    }

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
