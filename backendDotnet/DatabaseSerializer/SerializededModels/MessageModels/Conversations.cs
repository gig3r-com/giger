using MongoDB.Bson;

namespace Giger.SerializededModels.MessageModels
{
    public class Conversations : Models.MessageModels.Conversation
    {
        public Conversations()
        {
            Id = ObjectId.GenerateNewId().ToString();
            Messages = [ 
                new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Date = GigerDateTime.Now,
                    Sender = "jsilver",
                    Text = "Hello, I am interested in your services.",
                    Status = Models.MessageModels.MessageStatus.SENT
                },
                new ()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Date = GigerDateTime.Now.AddMinutes(2),
                    Sender = "jsilver",
                    Text = "Hello? Anyone here?",
                    Status = Models.MessageModels.MessageStatus.SENT
                },
                new()
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Date = GigerDateTime.Now.AddMinutes(6),
                    Sender = "jsilver",
                    Text = "Hellooooooo?!",
                    Status = Models.MessageModels.MessageStatus.SENT
                }
            ];
            Participants = ["jsilver", "adude"];
            GigConversation = false;
        }
    }
}
