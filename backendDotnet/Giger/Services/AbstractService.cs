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
            var mongoClient = new MongoClient(
                gigerDatabaseSettings.Value.ConnectionString);

            _mongoDatabase = mongoClient.GetDatabase(
                gigerDatabaseSettings.Value.DatabaseName);
        }
    }
}
