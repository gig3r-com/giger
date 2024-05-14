using Giger.Models.MessageModels;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Giger.Connections.Payloads
{
    public class MessagePayload
    {
        public MessagePayload() { }
        public MessagePayload(Message message, string conversationId, SocketMessageType messageType)
        {
            Message = message;
            ConversationId = conversationId;
            MessageType = messageType;
        }

        [BsonRepresentation(BsonType.String)]
        SocketMessageType MessageType { get; set; }
        
        public Message Message { get; set; }
        public string ConversationId { get; set; }
    }
}
