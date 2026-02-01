using Giger.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace Giger.Connections.SocketsManagment
{
    public class ConnectionsManager
    {
        private ConcurrentDictionary<string, WebSocket> _connections = new ConcurrentDictionary<string, WebSocket>();
        private readonly IServiceScopeFactory _scopeFactory;

        public ConnectionsManager(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
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

        public async Task AddSocket(WebSocket socket, string authToken)
        {
            using var scope = _scopeFactory.CreateScope();
            var loginService = scope.ServiceProvider.GetRequiredService<LoginService>();
            var auth = await loginService.GetByAuthTokenAsync(authToken);
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
            if (username != null && _connections.TryRemove(username, out var socket))
            {
                if (socket != null && socket.State == WebSocketState.Open)
                {
                    await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Socket connection closed", CancellationToken.None);
                    socket.Dispose();
                }
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