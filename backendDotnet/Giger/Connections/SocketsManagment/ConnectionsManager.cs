using Giger.Services;
using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace Giger.Connections.SocketsManagment
{
    public class ConnectionsManager
    {
        private ConcurrentDictionary<string, WebSocket> _connections = new ConcurrentDictionary<string, WebSocket>();
        private LoginService _auths{ get; }

        public ConnectionsManager(LoginService loginService)
        {
            _auths = loginService;
        }

        public WebSocket GetSocketByUser(string username)
        {
            return _connections.FirstOrDefault(conn => conn.Key == username).Value;
        }

        public ConcurrentDictionary<string, WebSocket> GetAllConnections()
        {
            return _connections;
        }

        public string GetUserId(WebSocket socket)
        {
            return _connections.FirstOrDefault(conn => conn.Value == socket).Key;
        }

        public async void AddSocket(WebSocket socket, string authToken)
        {
            var auth =  await _auths.GetByAuthTokenAsync(authToken);
            if (auth != null)
            {
                if (_connections.ContainsKey(auth.Username))
                {
                    await RemoveConnectionAsync(auth.Username);
                }
                _connections.TryAdd(auth.Username, socket);
            }
        }   

        public async Task RemoveConnectionAsync(string username)
        {
            if (_connections.ContainsKey(username) && _connections.TryRemove(username, out var socket))
            {
                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Socket connection closed", CancellationToken.None);
            }
        }

        internal IEnumerable<WebSocket> GetParticipants(IEnumerable<string> participants)
        {
            foreach (var participant in participants)
            {
                if (_connections.TryGetValue(participant, out WebSocket? value))
                {
                    yield return value;
                }
            }
        }
    }
}