using Giger.Models;
using Giger.Models.GigModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class GigService : AbstractService
    { 
        private readonly IMongoCollection<Gig> _gigsCollection;

        public GigService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _gigsCollection = _mongoDatabase.GetCollection<Gig>(
                gigerDatabaseSettings.Value.GigsCollectionName);
        }

        public async Task<List<Gig>> GetAllAsync() =>
            await _gigsCollection.Find(_ => true).ToListAsync();

        public async Task<List<Gig>> GetAllAvailableAsync() =>
            await _gigsCollection.Find(g => g.Status == GigStatus.AVAILABLE).ToListAsync();

        public async Task<List<Gig>> GetAllInProgressAsync(string takenBy) =>
            await _gigsCollection.Find(g => g.Status == GigStatus.IN_PROGRESS && g.TakenById == takenBy).ToListAsync();

        public async Task<Gig?> GetAsync(string id) =>
            await _gigsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Gig?> GetByFirstNameAsync(string title) =>
            await _gigsCollection.Find(x => x.Title == title).FirstOrDefaultAsync();

        public async Task CreateAsync(Gig newGig) =>
            await _gigsCollection.InsertOneAsync(newGig);

        public async Task UpdateAsync(string id, Gig updatedGig) =>
            await _gigsCollection.ReplaceOneAsync(x => x.Id == id, updatedGig);

        public async Task RemoveAsync(string id) =>
            await _gigsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
