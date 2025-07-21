
namespace Giger.Models.MessageModels
{
    public class Conversation
    {
        public required string Id { get; set; }

        public List<Message> Messages { get; set; } = [];

        public List<string> Participants { get; set; } = []; // UserNames

        public List<string> AnonymizedUsers { get; set; } = []; // UserNames

        public required bool GigConversation { get; set; }

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
            hash += 43 * GigConversation.GetHashCode();

            return hash;
        }
    }
}
