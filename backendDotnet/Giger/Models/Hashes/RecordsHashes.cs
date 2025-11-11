using Giger.Models.User;

namespace Giger.Models.Hashes
{
    public class RecordsHashes
    {
        public RecordsHashes() 
        {
            Id = new Guid().ToString();
        }

        public RecordsHashes(UserPrivate user)
        {
            Id = new Guid().ToString();

            int relationsHashCode = 3;
            foreach (var relation in user.Relations)
            {
                relationsHashCode += relation.GetHashCode();
            }
            RelationsHash = relationsHashCode;

            int goalsHashCode = 5;
            foreach (var goal in user.Goals)
            {
                goalsHashCode += goal.GetHashCode();
            }
            GoalsHash = goalsHashCode;

            int criminalEventsHashCode = 13;
            foreach (var criminalEvent in user.CriminalEvents)
            {
                criminalEventsHashCode += criminalEvent.GetHashCode();
            }
            CriminalEventsHash = criminalEventsHashCode;

            int privateRecordsHashCode = 17;
            foreach (var privateRecords in user.PrivateRecords)
            {
                privateRecordsHashCode += privateRecords.GetHashCode();
            }
            PrivateRecordsHash = privateRecordsHashCode;

            int medicalEventsHashCode = 23;
            foreach (var medicalEvent in user.MedicalEvents)
            {
                medicalEventsHashCode += medicalEvent.GetHashCode();
            }
            MedicalEventsHash = medicalEventsHashCode;
        }

        public string Id { get; set; }

        public int RelationsHash { get; set; }

        public int GoalsHash { get; set; }

        public int PrivateRecordsHash { get; set; }

        public int CriminalEventsHash { get; set; }

        public int MedicalEventsHash { get; set; }
    }
}
