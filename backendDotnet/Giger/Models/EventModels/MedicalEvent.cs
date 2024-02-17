namespace Giger.Models.EventModels
{
    public class MedicalEvent: Event
    {
        public MedicalEventType? Type { get; set; }
    }

    public enum MedicalEventType
    {
        CYBERWARE,
        MEDICAL_DRUG,
        MEDICAL_PROCEDURE,
        SYMPTOM
    }
}
