namespace Giger.Models.Hacking
{
    public class HackConfig
    {
        [JsonPropertyName("_id")]

        public string Id { get; set; } = string.Empty;
        
        public string Config { get; set; } = string.Empty;
    }
}
