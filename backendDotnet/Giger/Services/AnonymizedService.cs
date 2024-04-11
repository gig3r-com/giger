using Giger.Models;
using Giger.Models.User;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class AnonymizedService : AbstractService
    {
        private readonly IMongoCollection<AnonymizedUser> _anonymizedCollection;

        public AnonymizedService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _anonymizedCollection = _mongoDatabase.GetCollection<AnonymizedUser>(
                gigerDatabaseSettings.Value.AnonymizedCollectionName);
        }

        public async Task<List<AnonymizedUser>> GetAllAsync() =>
            await _anonymizedCollection.Find(_ => true).ToListAsync();

        public async Task<List<AnonymizedUser>> GetAllOfSameUserAsync(string userId) =>
            await _anonymizedCollection.Find(x => x.UserId == userId).ToListAsync();

        public async Task<AnonymizedUser> GetByAnonymizedNameIdAsync(string displayedAs) =>
            await _anonymizedCollection.Find(x => x.DisplyedAs == displayedAs).FirstOrDefaultAsync();

        public async Task<AnonymizedUser> GetByIdAsync(string id) =>
            await _anonymizedCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(AnonymizedUser newAnonymizedUser) =>
            await _anonymizedCollection.InsertOneAsync(newAnonymizedUser);

        public async Task UpdateAsync(string id, AnonymizedUser newAnonymizedUser) =>
            await _anonymizedCollection.ReplaceOneAsync(x => x.Id == id, newAnonymizedUser);

        public async Task RemoveAsync(string id) =>
            await _anonymizedCollection.DeleteOneAsync(x => x.Id == id);
    }
}
