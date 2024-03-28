namespace Giger.Models.EventModels
{
    public class CriminalEvent : Event
    {
        public CriminalEventType? Type { get; set; }
    }

    public enum CriminalEventType
    {
        VICTIM,
        SUSPECT,
        WANTED,
        WITNESS,
        PUNISHMENT
    }
}
