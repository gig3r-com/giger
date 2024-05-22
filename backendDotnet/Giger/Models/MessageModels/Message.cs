using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Diagnostics.CodeAnalysis;

namespace Giger.Models.MessageModels
{
    public class Message
    {
        [BsonElement("_id")]
        public required string Id { get; set; }

        public required DateTime Date { get; set; }

        public required string Sender { get; set; } // UserName

        public required string Text { get; set; }
        
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
