using MongoDB.Bson;

namespace Giger.SerializededModels.EventModels
{
    public class Implants : Models.EventModels.MedicalEvent
    {
        public Implants()
        {
            Id = ObjectId.GenerateNewId().ToString();
            IsRevealed = true;
            Name = "Cyberware Implantation";
            EventDescription = "You have been implanted with a cyberware.";
            Status = Models.EventModels.EventStatus.CURRENT;
            TimeStamp = null;
            Type = Models.EventModels.MedicalEventType.CYBERWARE;
        }
    }
}
