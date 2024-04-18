using System.Reflection;

namespace Giger.Services.Extensions
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddDbServices(this IServiceCollection services)
        {
            foreach (var type in Assembly.GetEntryAssembly().ExportedTypes)
            {
                if (type.GetTypeInfo().BaseType == typeof(AbstractService))
                    services.AddSingleton(type);
            }
            return services;
        }
    }
}
