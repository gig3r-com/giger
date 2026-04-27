using Giger.Models.MessageModels;

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
                            Timestamp = GigerDateTime.Now,
                            Sender = "jsilver",
                            Data = "Hello, I am interested in your services.",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Timestamp = GigerDateTime.Now.AddMinutes(2),
                            Sender = "jsilver",
                            Data = "Hello? Anyone here?",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Timestamp = GigerDateTime.Now.AddMinutes(6),
                            Sender = "jsilver",
                            Data = "Hellooooooo?!",
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
                            Timestamp = GigerDateTime.Now,
                            Sender = "jsilver",
                            Data = "I will get you everything on Takayama corporation",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Timestamp = GigerDateTime.Now.AddMinutes(2),
                            Sender = "triddle",
                            Data = "ACCEPTED",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Timestamp = GigerDateTime.Now.AddMinutes(2),
                            Sender = "triddle",
                            Data = "I will get back to you in a few hours",
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
                            Timestamp = GigerDateTime.Now,
                            Sender = "jsilver",
                            Data = "I will get you everything on Takayama corporation",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Timestamp = GigerDateTime.Now.AddMinutes(2),
                            Sender = "triddle",
                            Data = "ACCEPTED",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Timestamp = GigerDateTime.Now.AddMinutes(2),
                            Sender = "triddle",
                            Data = "I will get back to you in a few hours",
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
                            Timestamp = GigerDateTime.Now,
                            Sender = "triddle",
                            Data = "Please get me all you can on Takayama corporation",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Timestamp = GigerDateTime.Now.AddMinutes(2),
                            Sender = "jsilver",
                            Data = "ACCEPTED",
                        },
                        new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Timestamp = GigerDateTime.Now.AddMinutes(2),
                            Sender = "jsilver",
                            Data = "I will get back to you in a few hours",
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
