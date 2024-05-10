using Giger.Models;
using Giger.Models.EventModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class ImplantsService : AbstractService
    { 
        private readonly IMongoCollection<MedicalEvent> _implantsCollection;

        public ImplantsService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _implantsCollection = _mongoDatabase.GetCollection<MedicalEvent>(
                gigerDatabaseSettings.Value.ImplantsCollectionName);
        }

        public async Task<List<MedicalEvent>> GetAllAsync() =>
            await _implantsCollection.Find(_ => true).ToListAsync();

        public async Task<MedicalEvent?> GetAsync(string id) =>
            await _implantsCollection.Find(i => i.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(MedicalEvent newEvent) =>
            await _implantsCollection.InsertOneAsync(newEvent);

        public async Task UpdateAsync(MedicalEvent updatedEvent) =>
            await _implantsCollection.ReplaceOneAsync(x => x.Id == updatedEvent.Id, updatedEvent);

        public async Task RemoveAsync(string id) =>
            await _implantsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
