using Giger.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class GigerConfigService : AbstractService
    {
        private readonly IMongoCollection<GigerConfig> _gigerConfig;

        public GigerConfigService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _gigerConfig = _mongoDatabase.GetCollection<GigerConfig>(
                gigerDatabaseSettings.Value.GigerConfigCollectionName);
        }

        public async Task<GigerConfig> Get() =>
            await _gigerConfig.Find(_ => true).FirstOrDefaultAsync();

        public async Task UpdateAsync(GigerConfig config) =>
            await _gigerConfig.ReplaceOneAsync(x => x.Id == config.Id, config);
    }
}
