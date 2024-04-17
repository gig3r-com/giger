using MongoDB.Bson;

namespace Giger.SerializededModels.EventModels
{
    public class Implants : Models.EventModels.MedicalEvent
    {
        public Implants()
        {
            Id = ObjectId.GenerateNewId().ToString();
            Type = Models.EventModels.MedicalEventType.CYBERWARE;
            Status = Models.EventModels.EventStatus.CURRENT;
            EventDescription = "You have been implanted with a cyberware.";
            Name = "Cyberware Implantation";
        }
    }
}
