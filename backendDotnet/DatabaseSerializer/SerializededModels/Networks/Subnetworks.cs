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
                    Firewall = Firewall.VirtualVault,
                    OperatingSystem = Models.Networks.OperatingSystem.JoanOfArc,
                    Ice = [Ice.ToBeProvided],
                    PastHacks = ["attempted hack1", "123457"]
                },
                new Subnetwork()
                {
                    Id = "SN1337",
                    Name = "Subnetwork2",
                    NetworkId = "N666",
                    Users = ["123458"],
                    Firewall = Firewall.EncryptGuard,
                    OperatingSystem = Models.Networks.OperatingSystem.ForceField,
                    Ice = [Ice.ToBeProvided],
                    PastHacks = []
                },
            ];
            
        }
    }
}
