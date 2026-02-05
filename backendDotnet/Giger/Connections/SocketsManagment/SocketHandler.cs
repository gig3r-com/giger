using System.Net.WebSockets;
using System.Text;

namespace Giger.Connections.SocketsManagment
{
    public abstract class SocketHandler
    {
        public ConnectionsManager Connections { get; set; }

        public SocketHandler(ConnectionsManager connections)
        {
            Connections ??= connections;
        }

        public virtual async Task OnConnected(WebSocket socket, HttpContext context)
        {
            DebugLogger.Log($"[SocketHandler] OnConnected called");
            context.Request.Query.TryGetValue("AuthToken", out var token);
            DebugLogger.Log($"[SocketHandler] AuthToken from query: {(string.IsNullOrEmpty(token) ? "EMPTY" : token.ToString().Substring(0, 8) + "...")}");
            
            if (string.IsNullOrEmpty(token))
            {
                Console.WriteLine($"[SocketHandler] No token provided, closing socket");
                await socket.CloseAsync(WebSocketCloseStatus.PolicyViolation, "No token", CancellationToken.None);
                return;
            }
            DebugLogger.Log($"[SocketHandler] Calling AddSocket");
            await Task.Run(() => { Connections.AddSocket(socket, token); });
            DebugLogger.Log($"[SocketHandler] AddSocket task started");
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

        public async Task SendMessageAsync(string username, string message)
        {
            var socket = Connections.GetSocketByUser(username);
            if (socket != null)
                await SendMessageAsync(socket, message);
        }

        public async Task SendMessageToParticipantsAsync(string message, IEnumerable<string> participants)
        {
            foreach (var socket in Connections.GetParticipants(participants))
            {
                if (socket.State == WebSocketState.Open)
                {
                    await SendMessageAsync(socket, message);
                }
            }
        }

        public async Task SendMessageToAllAsync(string message)
        {
            foreach (var pair in Connections.GetAllConnections())
            {
                if (pair.Value.State == WebSocketState.Open)
                {
                    await SendMessageAsync(pair.Value, message);
                }
            }
        }

        public abstract Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}
