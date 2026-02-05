using Giger.Models.EventModels;

namespace Giger.SerializededModels.EventModels
{
    public class Implants
    {
        public MedicalEvent[] ImplantsTable { get; set; }

        public Implants()
        {
            ImplantsTable = [
                new MedicalEvent()
                {
                    Id = Guid.NewGuid().ToString(),
                    IsRevealed = true,
                    Name = "Cyberware Implantation",
                    EventDescription = "You have been implanted with a cyberware.",
                    Status = EventStatus.CURRENT,
                    TimeStamp = null,
                    Type = MedicalEventType.CYBERWARE
                },
                new MedicalEvent()
                {
                    Id = Guid.NewGuid().ToString(),
                    IsRevealed = true,
                    Name = "BioArm",
                    EventDescription = "You have been implanted with a bio arm.",
                    Status = EventStatus.CURRENT,
                    TimeStamp = null,
                    Type = MedicalEventType.CYBERWARE
                }
            ];
        }
    }
}
