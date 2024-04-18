using MongoDB.Bson;

namespace Giger.SerializededModels.Logs
{
    public class Log : Models.Logs.Log
    {
        public Log()
        {
            Id = ObjectId.GenerateNewId().ToString();
            Timestamp = DateTime.Now;
            SourceUserId = "123456";
            SourceUserName = "jsilver";
            SourceHackerName = null;
            TargetUserId = "123457";
            TargetUserName = "adude";
            LogType = Models.Logs.LogType.Transfer;
            LogData = $"Transaction from {SourceUserName} to {TargetUserName} on {Timestamp}";
            SubnetworkId = "SN999";
            SubnetworkName = "Test Subnetwork";
        }
    }
}
