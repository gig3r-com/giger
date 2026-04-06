using Giger.Models.MessageModels;

namespace Giger.DTOs
{
    public class ConversationDTO
    {
        public string Id { get; set; } = "";
        public bool GigConversation { get; set; }
        public List<MessageDTO> Messages { get; set; } = new();
        public List<string> Participants { get; set; } = new();
        public List<string> AnonymizedUsers { get; set; } = new();
        public List<string>? ParticipantsAllowedToSendMsgs { get; set; } = null;

        public static ConversationDTO FromModel(Conversation conversation)
        {
            return new ConversationDTO
            {
                Id = conversation.Id,
                GigConversation = conversation.GigConversation,
                Messages = conversation.Messages?.Select(MessageDTO.FromModel).ToList() ?? new(),
                Participants = conversation.Participants?.Select(p => p.UserHandle).ToList() ?? new(),
                AnonymizedUsers = conversation.AnonymizedUsers?.Select(a => a.UserHandle).ToList() ?? new(),
                ParticipantsAllowedToSendMsgs = null // Not implemented in backend yet
            };
        }
    }

    public class MessageDTO
    {
        public string Id { get; set; } = "";
        public string Date { get; set; } = "";
        public string Sender { get; set; } = "";
        public string Text { get; set; } = "";

        public static MessageDTO FromModel(Message message)
        {
            return new MessageDTO
            {
                Id = message.Id,
                Date = message.Timestamp.ToString("o"),  // ISO 8601 format
                Sender = message.Sender ?? "",
                Text = message.Data ?? ""
            };
        }
    }
}
