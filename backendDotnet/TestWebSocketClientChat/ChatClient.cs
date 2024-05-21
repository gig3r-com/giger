// See https://aka.ms/new-console-template for more information

using Giger.Connections.Payloads;
using System.Diagnostics;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

internal class ChatClient
{
    public int UserId { get; }
    public string User { get; set; }


    public ChatClient()
    {
        UserId = Process.GetCurrentProcess().Id;
    }

    Dictionary<string, string> users = new Dictionary<string, string>()
    {
        { "dess", "4f294805-3859-452a-bd0d-ca2b74ec038e" },
        { "0_connor", "1f2ca9a0-e2af-4677-b7f2-2461ee33b20f" },
    };

    string convId1 = "0c0bee8f-1ef1-4da2-996c-5a8f9bea6649";
    string convId2 = "a3a502ce-ae9b-4421-a371-515691b3a3cc";
    

    internal async Task StartChat(string user, int convId)
    {
        User = user;
        var client = new ClientWebSocket();
        client.Options.KeepAliveInterval = TimeSpan.FromSeconds(120);
        client.Options.SetRequestHeader("AuthToken", users[user]);
        //await client.ConnectAsync(new Uri($"ws://localhost:5174/ws?userId={UserId}"), CancellationToken.None);
        //await client.ConnectAsync(new Uri($"ws://localhost:18556/ws"), CancellationToken.None);
        //await client.ConnectAsync(new Uri($"ws://localhost:5000/ws"), CancellationToken.None);
        await client.ConnectAsync(new Uri($"wss://feat-ingress-websocket-support.gig3r.com/ws2137"), CancellationToken.None);
        //await client.ConnectAsync(new Uri($"ws://localhost:5174/ws1337"), CancellationToken.None);
        var send = Task.Run(async () =>
        {
            //while (client.State == WebSocketState.Open)
            string message;
            while (!string.IsNullOrEmpty(message = Console.ReadLine()))
            {
                var json = JsonSerializer.Serialize(CreateMessagePayload(message, convId));
                var bytes = Encoding.UTF8.GetBytes(json);
                var buffer = new ArraySegment<byte>(bytes);
                await client.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
            }
            await client.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
        });

        var receive = ReceiveAsync(client);
        await Task.WhenAll(send, receive);
    }

    MessagePayload CreateMessagePayload(string message, int convId)
    {
        MessagePayload payload = new MessagePayload();
        payload.Message = new Giger.Models.MessageModels.Message(User, message);
        if (convId == 1)
        {
            payload.ConversationId = convId1;
        }
        if (convId == 2)
        {
            payload.ConversationId = convId2;
        }
        return payload;
    }

    NotificationPayload CreateNotificationPayload(string message)
    {
        NotificationPayload payload = new() {  };
        return payload;
    }


    private static async Task ReceiveAsync(ClientWebSocket client)
    {
        
        var buffer = new byte[1024 * 4];
        while (true)
        //while (client.State == WebSocketState.Open)
        {     
            var result = await client.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            var json = Encoding.UTF8.GetString(buffer, 0, result.Count);
            var resultPayload = JsonSerializer.Deserialize<NotificationPayload>(json);

            Console.WriteLine(resultPayload.AccountId);
            if (result.MessageType == WebSocketMessageType.Close)
            { 
                await client.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "", CancellationToken.None);
                return;
            }
        }
    }
}