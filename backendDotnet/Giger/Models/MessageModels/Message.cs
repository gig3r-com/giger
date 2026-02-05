using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        public string Id { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public string Sender { get; set; } = string.Empty; // UserName

        public string Text { get; set; } = string.Empty;

        /// <summary>
        /// Type of message (for future use)
        /// </summary>
        public string? Type { get; set; }

        /// <summary>
        /// Message data payload (alternative to Text field)
        /// </summary>
        public string? Data { get; set; }

        /// <summary>
        /// List of user handles who have read this message
        /// </summary>
        public List<string> ReadBy { get; set; } = [];

        /// <summary>
        /// Handle of hacker who intercepted this message
        /// </summary>
        public string? Hacker { get; set; }

        /// <summary>
        /// Epsilon notes about this message
        /// </summary>
        public string? EpsilonNote { get; set; }
        
        public Message() { }

        [SetsRequiredMembers]
        public Message(string sender, string text)
        {
            Id = Guid.NewGuid().ToString();
            Date = GigerDateTime.Now;
            Sender = sender;
            Text = text;
        }

        public override int GetHashCode()
        {
            int hash = 3;
            hash += 5 * Date.GetHashCode();
            hash += 7 * Sender.GetHashCode();
            hash += 11 * Text.GetHashCode();
            return hash;
        }
    }
}
