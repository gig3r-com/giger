using Giger.Models.Networks;

namespace Giger.SerializededModels.Networks
{
    public class Networks
    {
        public Network[] NetworksTable { get; set; }
        
        public Networks()
        {
            NetworksTable = [
                new Network()
                {
                    Id = "N666",
                    Name = "The Matrix",
                    AdminId = "123456",
                    Subnetworks = [ "SN999", "SN1337" ]
                }
            ];
        }
    }
}
