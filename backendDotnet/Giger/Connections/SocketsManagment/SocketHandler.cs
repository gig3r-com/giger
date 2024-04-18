using System.Net.WebSockets;
using System.Text;

namespace Giger.Connections.SocketsManagment
{
    public abstract class SocketHandler
    {
        public ConnectionsManager Connections { get; set; }

        public SocketHandler(ConnectionsManager connections)
        {
            Connections = connections;
        }

        public virtual async Task OnConnected(WebSocket socket)
        {
            var socketID = Guid.NewGuid().ToString();
            await Task.Run(() => { Connections.AddSocket(socketID, socket); });
        }

        public virtual async Task OnDisconnected(WebSocket socket)
        {
            await Connections.RemoveConnectionAsync(Connections.GetUserId(socket));
        }

        public async Task SendMessageAsync(WebSocket socket, string message)
        {
            if (socket.State != WebSocketState.Open)
                return;

            var bytes = Encoding.UTF8.GetBytes(message);
            var buffer = new ArraySegment<byte>(bytes, 0, message.Length);
            await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
        }

        public async Task SendMessageAsync(string socketId, string message)
        {
            var socket = Connections.GetSocketById(socketId);
            if (socket != null)
                await SendMessageAsync(socket, message);
        }

        public async Task SendMessageToAllAsync(string message)
        {
            foreach (var pair in Connections.GetAllConnections())
            {
                if (pair.Value.State == WebSocketState.Open)
                    await SendMessageAsync(pair.Value, message);
            }
        }

        public abstract Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}
