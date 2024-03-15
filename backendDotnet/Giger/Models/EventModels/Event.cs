using MongoDB.Bson.Serialization.Attributes;

namespace Giger.Models.EventModels
{
    public class Event : ObscurableInfo
    {

        [BsonId]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string EventDescription { get; set; }
        public EventStatus Status { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Name { get; set; }
    }

    public enum EventStatus
    {
        CURRENT,
        HISTORICAL
    }
}