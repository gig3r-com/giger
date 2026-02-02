using System.Text.Json.Serialization;

namespace Giger.Models.Hacking
{
    public class HackConfig
    {
        public string Id { get; set; } = string.Empty;
        
        public string Config { get; set; } = string.Empty;
    }
}
