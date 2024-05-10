using Giger.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Giger.Models.Obscured;

namespace Giger.Services
{
    public class ObscuredDataService : AbstractService
    {
        private readonly IMongoCollection<ObscuredCodesMap> _obscuredCodesMapCollection;

        public ObscuredDataService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _obscuredCodesMapCollection = _mongoDatabase.GetCollection<ObscuredCodesMap>(
                gigerDatabaseSettings.Value.ObscuredCodesMapCollectionName);
        }

        public async Task<List<ObscuredCodesMap>> GetAllAsync() =>
            await _obscuredCodesMapCollection.Find(_ => true).ToListAsync();

        public async Task<ObscuredCodesMap?> GetByIdAsync(string id) =>
            await _obscuredCodesMapCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<ObscuredCodesMap?> GetByObscurableIdAsync(string obscruableId) =>
            await _obscuredCodesMapCollection.Find(x => x.ObscurableId == obscruableId).FirstOrDefaultAsync();

        public async Task<ObscuredCodesMap?> GetByCodeAndUserAsync(string revealCode, string username) =>
            await _obscuredCodesMapCollection.Find(x => x.ExpectedRevealCode == revealCode && x.Username == username).FirstOrDefaultAsync();

        public async Task<ObscuredCodesMap?> GetByRevealCodeIdAsync(string revealCode) =>
            await _obscuredCodesMapCollection.Find(x => x.ExpectedRevealCode == revealCode).FirstOrDefaultAsync();

        public async Task CreateAsync(ObscuredCodesMap newObscuredRevealedMap) =>
            await _obscuredCodesMapCollection.InsertOneAsync(newObscuredRevealedMap);

        public async Task UpdateAsync(ObscuredCodesMap updatedObscuredRevealedMap) =>
            await _obscuredCodesMapCollection.ReplaceOneAsync(x => x.Id == updatedObscuredRevealedMap.Id, updatedObscuredRevealedMap);

        public async Task RemoveAsync(string id) =>
            await _obscuredCodesMapCollection.DeleteOneAsync(x => x.Id == id);
    }
}