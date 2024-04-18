using Microsoft.AspNetCore.WebSockets;
using System.Reflection;

namespace Giger.Connections.SocketsManagment
{
    public static class SocketsExtension
    {
        public static IServiceCollection AddWebSocketManager(this IServiceCollection services)
        {
            services.AddTransient<ConnectionsManager>();
            foreach (var type in Assembly.GetEntryAssembly().ExportedTypes)
            {
                if (type.GetTypeInfo().BaseType == typeof(SocketHandler))
                    services.AddSingleton(type);
            }
            return services;
        }

        public static IApplicationBuilder MapSockets(this IApplicationBuilder app, PathString path, SocketHandler socketHandler) 
        {
            return app.Map(path, (x) => x.UseMiddleware<SocketMiddleware>(socketHandler));
        }
    }
}
