using Giger.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public abstract class AbstractService
    {
        protected IMongoDatabase _mongoDatabase;

        public AbstractService(IOptions<GigerDbSettings> gigerDatabaseSettings)
        {
            var settings = MongoClientSettings.FromConnectionString(gigerDatabaseSettings.Value.ConnectionString);
            settings.LinqProvider = MongoDB.Driver.Linq.LinqProvider.V3;

            var mongoClient = new MongoClient(settings);

            _mongoDatabase = mongoClient.GetDatabase(
                gigerDatabaseSettings.Value.DatabaseName);
        }
    }
}
