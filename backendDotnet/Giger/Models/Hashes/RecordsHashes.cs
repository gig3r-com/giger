using Giger.Models.Users;

namespace Giger.Models.Hashes
{
    public class RecordsHashes
    {
        public RecordsHashes() 
        {
            Id = new Guid().ToString();
        }

        public RecordsHashes(User user)
        {
            Id = new Guid().ToString();

            int relationsHashCode = 3;
            foreach (var relation in user.HardRecords)
            {
                relationsHashCode += relation.GetHashCode();
            }
            HardRecords = relationsHashCode;

            int goalsHashCode = 5;
            foreach (var goal in user.OffGameRecords)
            {
                goalsHashCode += goal.GetHashCode();
            }
            OffGameRecords = goalsHashCode;

            int criminalEventsHashCode = 13;
            foreach (var criminalEvent in user.MindRecords)
            {
                criminalEventsHashCode += criminalEvent.GetHashCode();
            }
            MindRecords = criminalEventsHashCode;
        }

        public string Id { get; set; }

        public int HardRecords { get; set; }

        public int OffGameRecords { get; set; }

        public int MindRecords { get; set; }
    }
}
