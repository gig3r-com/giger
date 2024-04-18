namespace Giger.SerializededModels.Networks
{
    public class Subnetwork : Models.Networks.Subnetwork
    {
        public Subnetwork()
        {
            Id = "SN999";
            Name = "Test Subnetwork";
            NetworkId = "N666";
            Users = ["123456", "123457"];
            Firewall = Models.Networks.Firewall.EncryptGuard;
            OperatingSystem = Models.Networks.OperatingSystem.ForceField;
            Ice = [Models.Networks.Ice.ToBeProvided];
            PastHacks = ["attempted hack1", "123457" ];
        }
    }
}
