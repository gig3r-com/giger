namespace Giger.Models.Networks
{
    public class Network
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string[] Subnetworks { get; set; } = [];
        public string? AdminId { get; set; }
    }
}
