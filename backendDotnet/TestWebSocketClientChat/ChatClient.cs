// See https://aka.ms/new-console-template for more information

using System.Diagnostics;
using System.Net.WebSockets;
using System.Text;

internal class ChatClient
{
    public int UserId { get; }
    public int UserToChatWith { get; private set; }

    public ChatClient()
    {
        UserId = Process.GetCurrentProcess().Id;
    }

    internal async Task StartChat(int user)
    {
        UserToChatWith = user;
        var client = new ClientWebSocket();
        //await client.ConnectAsync(new Uri($"ws://localhost:5174/ws?userId={UserId}"), CancellationToken.None);
        await client.ConnectAsync(new Uri($"ws://localhost:18556/ws"), CancellationToken.None);
        //await client.ConnectAsync(new Uri($"ws://localhost:5000/ws"), CancellationToken.None);
        //await client.ConnectAsync(new Uri($"ws://localhost:5174/ws"), CancellationToken.None);
        var send = Task.Run(async () =>
        {
            //while (client.State == WebSocketState.Open)
            string message;
            while (!string.IsNullOrEmpty(message = Console.ReadLine()))
            {
                //var message = Console.ReadLine();
                var bytes = Encoding.UTF8.GetBytes(message);
                var buffer = new ArraySegment<byte>(bytes);
                await client.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
            }
            await client.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
        });

        var receive = ReceiveAsync(client);
        await Task.WhenAll(send, receive);
    }

    private static async Task ReceiveAsync(ClientWebSocket client)
    {
        
        var buffer = new byte[1024 * 4];
        while (true)
        //while (client.State == WebSocketState.Open)
        {     
            var result = await client.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            Console.WriteLine(message);
            if (result.MessageType == WebSocketMessageType.Close)
            { 
                await client.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
                return;
            }
        }
    }
}