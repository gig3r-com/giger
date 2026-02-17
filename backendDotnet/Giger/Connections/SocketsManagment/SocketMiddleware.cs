using System.Net.WebSockets;

namespace Giger.Connections.SocketsManagment
{
    internal class SocketMiddleware
    {
        private readonly RequestDelegate _next;

        public SocketMiddleware(RequestDelegate next, SocketHandler handler)
        {
            _next = next;
            Handler = handler;
        }

        private SocketHandler Handler { get; set; }

        public async Task InvokeAsync(HttpContext context)
        {
            Console.WriteLine($"[SocketMiddleware] Request received: {context.Request.Path}, IsWebSocketRequest: {context.WebSockets.IsWebSocketRequest}");
            
            if (!context.WebSockets.IsWebSocketRequest)
            {
                Console.WriteLine("[SocketMiddleware] Not a WebSocket request, returning");
                return;
            }

            Console.WriteLine("[SocketMiddleware] Accepting WebSocket...");
            var socket = await context.WebSockets.AcceptWebSocketAsync();
            Console.WriteLine($"[SocketMiddleware] WebSocket accepted, state: {socket.State}");

            await Handler.OnConnected(socket, context);
            Console.WriteLine("[SocketMiddleware] OnConnected completed");
            await Receive(socket, async (result, buffer) => 
            {
                if (result.MessageType == WebSocketMessageType.Text)
                {
                    await Handler.ReceiveAsync(socket, result, buffer);
                }
                else if (result.MessageType == WebSocketMessageType.Close)
                {
                    await Handler.OnDisconnected(socket);
                }
            });
        }

        private async Task Receive(WebSocket socket, Action<WebSocketReceiveResult, byte[]> messageHandler)
        {
            var buffer = new byte[1024 * 4];
            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                messageHandler(result, buffer);
            }
        }
    }
}