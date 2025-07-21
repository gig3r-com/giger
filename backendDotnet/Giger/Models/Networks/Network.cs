namespace Giger.Models.Networks
{
    public class Network
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public string[] Subnetworks { get; set; } = [];
        public string? AdminId { get; set; }
    }
}
