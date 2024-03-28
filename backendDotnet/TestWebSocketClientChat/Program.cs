// See https://aka.ms/new-console-template for more information
Console.WriteLine("Welcome to GiG3R test chat.");
while (true)
{
    Enter();
    switch (Console.ReadKey().Key)
    {
        case ConsoleKey.D1:
        {
            StartChat();
            break;
        }
        case ConsoleKey.D2:
        {
            Console.WriteLine("Thank you for using GiG3R test app");
            Console.ReadKey();
            return;
        }
        default:
        {
            Console.WriteLine("Unknown command");
            break;
        }
    }
}

void StartChat()
{
    var client = new ChatClient();
    Console.WriteLine($"Your ID is {client.UserId}");
    //Console.Write("Please enter user ID to start chat with: ");
    //var user = Console.ReadLine();
    string user = "0";
    if (string.IsNullOrEmpty(user))
    {
        Console.WriteLine("User ID can't be empty");
        return;
    }
    //Console.WriteLine($"Starting chat with user {user}");
    client.StartChat(int.Parse(user)).GetAwaiter().GetResult();
}

void Enter()
{
    Console.WriteLine("Please chose one of the options:");
    Console.WriteLine("1 - Start coversation with a user");
    Console.WriteLine("2 - Exit");
}