using Giger.Models;
using Giger.Models.EventModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class ImplantsService : AbstractService
    { 
        private readonly IMongoCollection<MedicalEvent> _eventsCollection;

        public ImplantsService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _eventsCollection = _mongoDatabase.GetCollection<MedicalEvent>(
                gigerDatabaseSettings.Value.EventsCollectionName);
        }

        public async Task<List<MedicalEvent>> GetAllAsync() =>
            await _eventsCollection.Find(_ => true).ToListAsync();

        public async Task<MedicalEvent?> GetAsync(string id) =>
            await _eventsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(MedicalEvent newEvent) =>
            await _eventsCollection.InsertOneAsync(newEvent);

        public async Task UpdateAsync(string id, MedicalEvent updatedEvent) =>
            await _eventsCollection.ReplaceOneAsync(x => x.Id == id, updatedEvent);

        public async Task RemoveAsync(string id) =>
            await _eventsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
