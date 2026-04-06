using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.Networks
{
    public class SubnetworkUser
    {
        public required string SubnetworkId { get; set; }
        [ForeignKey("SubnetworkId")]
        public Subnetwork? Subnetwork { get; set; }

        public required string UserHandle { get; set; }
    }
}
