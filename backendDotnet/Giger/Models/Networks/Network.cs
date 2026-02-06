using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.Networks
{
    public class Network
    {
        [Key]
        public required string Id { get; set; }

        public required string Name { get; set; }

        public string? Admin { get; set; } // user handle

        public string[] Subnetworks { get; set; } = []; // subnetwork names

        [Column(TypeName = "jsonb")]
        public Dictionary<string, string> Nodes { get; set; } = new();

        [Column(TypeName = "jsonb")]
        public Dictionary<string, string> Data { get; set; } = new();

        public string? EpsilonDescription { get; set; }
    }
}
