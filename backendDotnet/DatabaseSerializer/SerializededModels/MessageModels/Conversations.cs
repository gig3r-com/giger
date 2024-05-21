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
                    Id = Guid.NewGuid().ToString(),
                    Messages = [
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Date = GigerDateTime.Now,
                            Sender = "jsilver",
                            Text = "Hello, I am interested in your services.",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(2),
                            Sender = "jsilver",
                            Text = "Hello? Anyone here?",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(6),
                            Sender = "jsilver",
                            Text = "Hellooooooo?!",
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
                            Id = Guid.NewGuid().ToString(),
                            Date = GigerDateTime.Now,
                            Sender = "jsilver",
                            Text = "I will get you everything on Takayama corporation",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(2),
                            Sender = "triddle",
                            Text = "ACCEPTED",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(2),
                            Sender = "triddle",
                            Text = "I will get back to you in a few hours",
                        },
                    ],
                    Participants = ["jsilver", "triddle"],
                    GigConversation = true,
                },
                new Conversation()
                {
                    Id = "987987",
                    Messages = [
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Date = GigerDateTime.Now,
                            Sender = "jsilver",
                            Text = "I will get you everything on Takayama corporation",
                        },
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(2),
                            Sender = "triddle",
                            Text = "ACCEPTED",
                        },
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(2),
                            Sender = "triddle",
                            Text = "I will get back to you in a few hours",
                        },
                    ],
                    Participants = ["jsilver", "triddle"],
                    GigConversation = true,
                },
                new Conversation()
                {
                    Id = "987987",
                    Messages = [
                        new()
                        {
                            Id = ObjectId.GenerateNewId().ToString(),
                            Date = GigerDateTime.Now,
                            Sender = "triddle",
                            Text = "Please get me all you can on Takayama corporation",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(2),
                            Sender = "jsilver",
                            Text = "ACCEPTED",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Date = GigerDateTime.Now.AddMinutes(2),
                            Sender = "jsilver",
                            Text = "I will get back to you in a few hours",
                        },
                    ],
                    Participants = ["jsilver", "triddle"],
                    GigConversation = true,
                },
                new Conversation()
                {
                    Id = "1789336",
                    Messages = [
                        new("jsilver", "I want you to find and bring back Android #1532")
                    ],
                    Participants = ["jsilver"],
                    GigConversation = true,
                }
            ];
        }
    }
}
