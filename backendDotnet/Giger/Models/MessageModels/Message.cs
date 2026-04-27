using System.Diagnostics.CodeAnalysis;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        public required string Id { get; set; }

        public required DateTime Timestamp { get; set; }

        public required string Sender { get; set; } // user handle

        public string Type { get; set; }

        public required string Data { get; set; }

        public List<string> ReadBy { get; set; } = []; // user handles

        public string Hacker { get; set; }

        public string EpsilonNote { get; set; }
        
        public string ConversationId { get; set; } // conversation FK

        public Message() { }

        [SetsRequiredMembers]
        public Message(string sender, string text)
        {
            Id = Guid.NewGuid().ToString();
            Timestamp = GigerDateTime.Now;
            Sender = sender;
            Data = text;
        }

        public override int GetHashCode()
        {
            int hash = 3;
            hash += 5 * Timestamp.GetHashCode();
            hash += 7 * Sender.GetHashCode();
            hash += 11 * Data.GetHashCode();
            hash += 13 * Type.GetHashCode();
            hash += 17 * Hacker.GetHashCode();
            hash += 19 * EpsilonNote.GetHashCode();
            foreach (var reader in ReadBy)
            {
                hash += 23 * reader.GetHashCode();
            }
            return hash;
        }
    }
}
