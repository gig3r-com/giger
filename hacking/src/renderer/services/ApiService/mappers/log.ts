export default function mapLog(data: any) {
  return {
    data: data.logData,
    type: data.logType,
    sourceUserName: data.sourceUserName,
    sourceUserId: data.sourceUserId,
    sourceHackerName: data.sourceHackerName,
    subnetworkId: data.subnetworkId,
    subnetworkName: data.subnetworkName,
    targetUserId: data.targetUserId,
    targetUserName: data.targetUserName,
    time: data.timestamp,
  };
}
