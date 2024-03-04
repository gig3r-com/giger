using Giger.Models;
using Giger.Models.MessageModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class ConversationService
    { 
        private readonly IMongoCollection<Conversation> _conversationsCollection;

        public ConversationService(IOptions<GigerDbSettings> gigerDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                gigerDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                gigerDatabaseSettings.Value.DatabaseName);

            _conversationsCollection = mongoDatabase.GetCollection<Conversation>(
                gigerDatabaseSettings.Value.GigsCollectionName);
        }

        public async Task<List<Conversation>> GetAllAsync() =>
            await _conversationsCollection.Find(_ => true).ToListAsync();

        public async Task<Conversation?> GetAsync(int id) =>
            await _conversationsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<List<Conversation>> GetAllWithParticipantAsync(string participant) =>
            await _conversationsCollection.Find(x => x.Participants.Contains(participant)).ToListAsync();

        public async Task CreateAsync(Conversation newConversation) =>
            await _conversationsCollection.InsertOneAsync(newConversation);

        public async Task UpdateAsync(int id, Conversation updatedConversation) =>
            await _conversationsCollection.ReplaceOneAsync(x => x.Id == id, updatedConversation);

        public async Task UpsertAsync(int id, Conversation updatedConversation) =>
            await _conversationsCollection.ReplaceOneAsync(x => x.Id == id, updatedConversation, new ReplaceOptions() { IsUpsert = true });

        public async Task RemoveAsync(int id) =>
            await _conversationsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
