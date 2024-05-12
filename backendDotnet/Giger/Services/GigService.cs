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

        public async Task<List<Gig>> GetAllVisibleToUserAsync(string requestSenderId) =>
            await _gigsCollection.Find(g => g.Status == GigStatus.AVAILABLE ||
                    g.TakenById == requestSenderId || g.AuthorId == requestSenderId).ToListAsync();

        public async Task<List<Gig>> GetAllVisibleToModeratorAsync(string requestSenderId) =>
            await _gigsCollection.Find(g => g.Status == GigStatus.AVAILABLE || g.Status == GigStatus.DISPUTE ||
                    g.TakenById == requestSenderId || g.AuthorId == requestSenderId).ToListAsync();

        public async Task<List<Gig>> GetAllOwnAsync(string takenBy) =>
            await _gigsCollection.Find(g => g.TakenById == takenBy).ToListAsync();

        public async Task<Gig?> GetAsync(string id) =>
            await _gigsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<long> GetLimitedUserGigsCountAsync(string takenBy) =>
            await _gigsCollection.Find(x => x.TakenById == takenBy && x.Mode == GigModes.CLIENT &&
                (x.Status == GigStatus.IN_PROGRESS || x.Status == GigStatus.DISPUTE)).CountDocumentsAsync();

        public async Task<Gig?> GetByFirstNameAsync(string title) =>
            await _gigsCollection.Find(x => x.Title == title).FirstOrDefaultAsync();

        public async Task CreateAsync(Gig newGig) =>
            await _gigsCollection.InsertOneAsync(newGig);

        public async Task UpdateAsync(Gig updatedGig) =>
            await _gigsCollection.ReplaceOneAsync(x => x.Id == updatedGig.Id, updatedGig);

        public async Task RemoveAsync(string id) =>
            await _gigsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
