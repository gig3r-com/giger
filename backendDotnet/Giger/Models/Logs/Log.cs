using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.Logs
{
    public class Log
    {
        [Key]
        public required string Id { get; set; }

        public DateTime Timestamp { get; set; }

        public required string SourceUser { get; set; } // user handle

        public string? TargetUser { get; set; } // user handle

        public required string LogType { get; set; } // string, not enum

        public required string LogData { get; set; }

        public string? Subnetwork { get; set; } // subnetwork name

        [Column(TypeName = "jsonb")]
        public Dictionary<string, string> HackData { get; set; } = new();
    }
}
