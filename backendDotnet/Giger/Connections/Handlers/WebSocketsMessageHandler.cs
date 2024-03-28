using Giger.Connections.SocketsManagment;
using System.Net.WebSockets;
using System.Text;

namespace Giger.Connections.Handlers
{
    public class WebSocketsMessageHandler : SocketHandler
    {
        public WebSocketsMessageHandler(ConnectionsManager connections) : base(connections)
        {
        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);
            var socketID = Connections.GetUserId(socket);
            await SendMessageToAllAsync($"{socketID} is now connected");
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var socketID = Connections.GetUserId(socket);
            var message = $"{socketID} said: {Encoding.UTF8.GetString(buffer, 0, result.Count)}";
            await SendMessageToAllAsync(message);
        }
    }
}
