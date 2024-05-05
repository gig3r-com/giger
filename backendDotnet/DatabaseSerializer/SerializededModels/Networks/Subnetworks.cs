using Giger.Models.Networks;

namespace Giger.SerializededModels.Networks
{
    public class Subnetworks
    {
        public Subnetwork[] SubnetworksTable { get; set; }

        public Subnetworks()
        {
            SubnetworksTable = [
                new Subnetwork()
                {
                    Id = "SN999",
                    Name = "Subnetwork1",
                    NetworkId = "N666",
                    Users = ["123456", "123457"],
                    Firewall = Firewall.VIRTUAL_VAULT,
                    OperatingSystem = Models.Networks.OperatingSystem.JOAN_OF_ARC,
                    Ice = [Ice.NONE],
                    PastHacks = ["attempted hack1", "123457"]
                },
                new Subnetwork()
                {
                    Id = "SN1337",
                    Name = "Subnetwork2",
                    NetworkId = "N666",
                    Users = ["123458"],
                    Firewall = Firewall.ENCRYPT_GUARD,
                    OperatingSystem = Models.Networks.OperatingSystem.FORCE_FIELD,
                    Ice = [Ice.NONE],
                    PastHacks = []
                },
            ];
            
        }
    }
}
