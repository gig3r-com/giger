namespace Giger.SerializededModels.Networks
{
    public class Network : Models.Networks.Network
    {
        public Network()
        {
            Id = "N666";
            Name = "The Matrix";
            AdminId = "U666";
            Subnetworks = [ "SN999", "SN1337" ];
        }
    }
}
