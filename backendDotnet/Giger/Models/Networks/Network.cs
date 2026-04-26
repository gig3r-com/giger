namespace Giger.Models.Networks
{
    public class Network
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public string? Admin { get; set; }
        public string[] Subnetworks { get; set; } = [];
        public Dictionary<string, string> Nodes { get; set; } = new Dictionary<string, string>();
        public Dictionary<string, string> Data { get; set; } = new Dictionary<string, string>();
        public string EpsilonDescription { get; set; }
    }
}
