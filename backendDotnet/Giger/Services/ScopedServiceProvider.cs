namespace Giger.Services
{
    public class ScopedServiceProvider
    {
        public static T CreateScopedGigerService<T>(IServiceProvider serviceProvider) where T : IGigerService
        {
            using var scope = serviceProvider.CreateScope();
            return scope.ServiceProvider.GetRequiredService<T>();
        }
    }
}
