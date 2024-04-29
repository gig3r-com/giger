using Giger.Models.MessageModels;
using MongoDB.Bson;

namespace Giger.SerializededModels.MessageModels
{
    public class Conversations
    {
        public Conversation[] ConversationsTable { get; set; }

        public Conversations()
        {
            ConversationsTable = [
                new Conversation()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Messages = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Date = GigerDateTime.Now,
                            Sender = "jsilver",
                            Text = "Hello, I am interested in your services.",
                            Status = MessageStatus.SENT
                        },
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(2),
                            Sender = "jsilver",
                            Text = "Hello? Anyone here?",
                            Status = MessageStatus.SENT
                        },
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(6),
                            Sender = "jsilver",
                            Text = "Hellooooooo?!",
                            Status = MessageStatus.SENT
                        }
                    ],
                    Participants = ["jsilver", "triddle"],
                    GigConversation = false,
                },
                new Conversation()
                {
                    Id = "789336",
                    Messages = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Date = GigerDateTime.Now,
                            Sender = "triddle",
                            Text = "Please get me all you can on Takayama corporation",
                            Status = MessageStatus.SENT
                        },
                    ],
                    Participants = ["jsilver", "triddle"],
                    GigConversation = true,
                }
            ];
        }
    }
}
