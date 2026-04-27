using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.MessageModels
{
    public class Conversation
    {
        public required string Id { get; set; }

        public string Title { get; set; }

        public List<string> Participants { get; set; } = []; // user handles

        public List<string> AnonymizedUsers { get; set; } = []; // user handles

        public required bool GigConversation { get; set; }

        public string GigId { get; set; } // gig FK, only for gig conversations

        [NotMapped]
        public List<Message> Messages { get; set; } = [];

        public List<string> Hackers { get; set; } = []; // user handles

        public override int GetHashCode()
        {
            int hash = 27;
            foreach (var message in Messages)
            {
                hash += 31 * message.GetHashCode();
            }
            foreach (var participant in Participants)
            {
                hash += 37 * participant.GetHashCode();
            }
            foreach (var anonymizedUser in AnonymizedUsers)
            {
                hash += 41 * anonymizedUser.GetHashCode();
            }
            foreach (var hacker in Hackers)
            {
                hash += 43 * hacker.GetHashCode();
            }
            hash += 47 * GigConversation.GetHashCode();
            hash += 53 * Title.GetHashCode();

            return hash;
        }
    }
}
