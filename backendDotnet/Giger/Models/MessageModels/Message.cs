using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        [JsonPropertyName("_id")]

        public string Id { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public string Sender { get; set; } = string.Empty; // UserName

        public string Text { get; set; } = string.Empty;
        
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
