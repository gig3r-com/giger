using Giger.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public abstract class AbstractService
    {
        protected static IMongoDatabase _mongoDatabase;
        private static object padlock = new object();

        public AbstractService(IOptions<GigerDbSettings> gigerDatabaseSettings)
        {
            lock (padlock)
            {
                if (_mongoDatabase == null)
                {
                    var MongoSettings = new MongoClientSettings()
                    {
                        Server = new MongoServerAddress(gigerDatabaseSettings.Value.Host, gigerDatabaseSettings.Value.Port),
                        Credential = MongoCredential.CreateCredential(
                            gigerDatabaseSettings.Value.DatabaseName,
                            gigerDatabaseSettings.Value.Username,
                            gigerDatabaseSettings.Value.Password),
                        LinqProvider = MongoDB.Driver.Linq.LinqProvider.V3,
                    };
                    var mongoClient = new MongoClient(MongoSettings);

                    _mongoDatabase = mongoClient.GetDatabase(
                        gigerDatabaseSettings.Value.DatabaseName);
                }
            }
        }
    }
}
