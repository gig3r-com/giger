using Giger.Models.MessageModels;

namespace Giger.Connections.Payloads
{
    public class MessagePayload
    {
        public MessagePayload() { }

        public MessagePayload(Message message, string conversationId, bool isGigConveration)
        {
            Message = message;
            ConversationId = conversationId;
            IsGigConveration = isGigConveration;
        }

        public Message Message { get; set; }
        public string ConversationId { get; set; }
        public bool IsGigConveration { get; set; }
    }
}
