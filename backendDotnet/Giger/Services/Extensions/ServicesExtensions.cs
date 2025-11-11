using System.Reflection;

namespace Giger.Services.Extensions
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddDbServices(this IServiceCollection services)
        {
            foreach (var type in Assembly.GetEntryAssembly().ExportedTypes)
            {
                if (type.GetTypeInfo().GetInterfaces().Any(i => i == typeof(IGigerService)))
                    services.AddScoped(type);
            }
            return services;
        }
    }
}
