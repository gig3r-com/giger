using Giger.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Giger.Models.Hacking;

namespace Giger.Services
{
    public class HackConfigService : AbstractService
    {
        private readonly IMongoCollection<HackConfig> _hackConfigsCollection;

        public HackConfigService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _hackConfigsCollection = _mongoDatabase.GetCollection<HackConfig>(
                gigerDatabaseSettings.Value.HackConfigCollectionName);
        }

        public async Task<List<HackConfig>> GetAll() =>
            await _hackConfigsCollection.Find(_ => true).ToListAsync();

        public async Task<HackConfig?> GetById(string id) =>
            await _hackConfigsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(HackConfig newAuth) =>
            await _hackConfigsCollection.InsertOneAsync(newAuth);

        public async Task UpdateAsync(HackConfig newAuth) =>
            await _hackConfigsCollection.ReplaceOneAsync(x => x.Id == newAuth.Id, newAuth);

        public async Task RemoveAsync(string id) =>
            await _hackConfigsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
