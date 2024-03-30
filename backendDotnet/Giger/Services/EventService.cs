using Giger.Models;
using Giger.Models.EventModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class EventService : AbstractService
    { 
        private readonly IMongoCollection<Event> _eventsCollection;

        public EventService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _eventsCollection = _mongoDatabase.GetCollection<Event>(
                gigerDatabaseSettings.Value.EventsCollectionName);
        }

        public async Task<List<Event>> GetAllAsync() =>
            await _eventsCollection.Find(_ => true).ToListAsync();

        public async Task<Event?> GetAsync(string id) =>
            await _eventsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Event?> GetByFirstNameAsync(string name) =>
            await _eventsCollection.Find(x => x.Name == name).FirstOrDefaultAsync();

        public async Task CreateAsync(Event newEvent) =>
            await _eventsCollection.InsertOneAsync(newEvent);

        public async Task UpdateAsync(string id, Event updatedEvent) =>
            await _eventsCollection.ReplaceOneAsync(x => x.Id == id, updatedEvent);

        public async Task UpsertAsync(string id, Event updatedEvent) =>
            await _eventsCollection.ReplaceOneAsync(x => x.Id == id, updatedEvent, new ReplaceOptions() { IsUpsert = true });

        public async Task RemoveAsync(string id) =>
            await _eventsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
