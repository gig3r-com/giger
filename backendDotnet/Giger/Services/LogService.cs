using Giger.Models.BankingModels;
using Giger.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Giger.Models.Logs;

namespace Giger.Services
{
    public class LogService : AbstractService
    {
        private readonly IMongoCollection<Log> _logsCollection;

        public LogService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _logsCollection = _mongoDatabase.GetCollection<Log>(
                gigerDatabaseSettings.Value.LogsCollectionName);
        }

        public async Task<List<Log>> GetAllForSubnetworkAsync(string subnetworkId) =>
            await _logsCollection.Find(x => x.SubnetworkId == subnetworkId).ToListAsync();

        public async Task<Log> GetByIdAsync(string id) =>
            await _logsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Log newAccount) =>
            await _logsCollection.InsertOneAsync(newAccount);

        public async Task UpdateAsync(Log updatedAccount) =>
            await _logsCollection.ReplaceOneAsync(x => x.Id == updatedAccount.Id, updatedAccount);

        public async Task RemoveAsync(string id) =>
            await _logsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
