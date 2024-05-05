using Giger.Models.Logs;
using MongoDB.Bson;

namespace Giger.SerializededModels.Logs
{
    public class Logs
    {
        public Log[] LogsTable { get; set; }

        public Logs()
        {
            LogsTable = [
                new Log()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    SourceUserId = "123456",
                    SourceUserName = "jsilver",
                    SourceHackerName = null,
                    TargetUserId = "123457",
                    TargetUserName = "triddle",
                    LogType = LogType.TRANSFER,
                    Timestamp = GigerDateTime.Now,
                    LogData = $"Transaction from jsilver to triddle on {GigerDateTime.Now}",
                    SubnetworkId = "SN999",
                    SubnetworkName = "Test Subnetwork",
                },
            ];
            
        }
    }
}
