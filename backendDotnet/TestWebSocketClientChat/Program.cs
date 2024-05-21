// See https://aka.ms/new-console-template for more information
Console.WriteLine("Welcome to GiG3R test chat.");
Console.WriteLine("1 - dess");
Console.WriteLine("2 - 0_connor");
while (true)
{
    Enter();
    switch (Console.ReadKey().Key)
    {
        case ConsoleKey.D1:
        {
            StartChat("dess", 1);
            break;
        }
        case ConsoleKey.D2:
            {
                StartChat("0_connor", 1);
                break;
            }
        case ConsoleKey.D3:
            {
                StartChat("dess", 2);
                break;
            }
        case ConsoleKey.D4:
            {
                StartChat("0_connor",2);
                break;
            }
        case ConsoleKey.D0:
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

void StartChat(string user, int convId)
{
    var client = new ChatClient();
    Console.WriteLine($"Your ID is {client.UserId}");
    //Console.Write("Please enter user ID to start chat with: ");
    //var user = Console.ReadLine();
    if (string.IsNullOrEmpty(user))
    {
        Console.WriteLine("User ID can't be empty");
        return;
    }
    //Console.WriteLine($"Starting chat with user {user}");
    client.StartChat(user, convId).GetAwaiter().GetResult();
}

void Enter()
{
    Console.WriteLine("Please chose one of the options:");
    Console.WriteLine("1 - Start coversation with a user");
    Console.WriteLine("2 - Exit");
}