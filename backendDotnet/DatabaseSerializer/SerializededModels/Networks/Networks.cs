namespace Giger.SerializededModels.Networks
{
    public class Networks : Models.Networks.Network
    {
        public Networks()
        {
            Id = "N666";
            Name = "The Matrix";
            AdminId = "U666";
            Subnetworks = [ "SN999", "SN1337" ];
        }
    }
}
