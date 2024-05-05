using MongoDB.Bson;

namespace Giger.SerializededModels.Hacking
{
    public class HackConfigs
    {
        public Models.Hacking.HackConfig[] CodesMapTable { get; set; }

        public HackConfigs()
        {
            CodesMapTable = [
                new Models.Hacking.HackConfig()
                {
                    Id = Guid.NewGuid().ToString(),
                    Config = ""
                }
            ];
        }
    }
}
