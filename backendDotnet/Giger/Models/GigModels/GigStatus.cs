using System.Runtime.Serialization;

namespace Giger.Models.GigModels
{
    public enum GigStatus
    {
        [EnumMember(Value = "available")]
        AVAILABLE,
        IN_PROGRESS,
        COMPLETED,
        PENDING,
        DISPUTE
    }
}