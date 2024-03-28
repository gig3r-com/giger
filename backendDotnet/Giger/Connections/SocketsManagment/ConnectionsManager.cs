using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace Giger.Connections.SocketsManagment
{
    public class ConnectionsManager
    {
        private ConcurrentDictionary<string, WebSocket> _connections = new ConcurrentDictionary<string, WebSocket>();
        private ConcurrentDictionary<string, string> _userMap = new ConcurrentDictionary<string, string>();

        public WebSocket GetSocketById(string userId)
        {
            return _connections.FirstOrDefault(conn => conn.Key == userId).Value;
        }

        public ConcurrentDictionary<string, WebSocket> GetAllConnections()
        {
            return _connections;
        }

        public string GetUserId(WebSocket socket)
        {
            return _connections.FirstOrDefault(conn => conn.Value == socket).Key;
        }

        public void AddSocket(string userId, WebSocket socket)
        {
            _connections.TryAdd(userId, socket);
        }   

        public async Task RemoveConnectionAsync(string userId)
        {
            if (_connections.TryRemove(userId, out var socket))
            {
                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Socket connection closed", System.Threading.CancellationToken.None);
            }
        }
    }
}