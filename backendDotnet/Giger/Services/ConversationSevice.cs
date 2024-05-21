using Giger.Models;
using Giger.Models.MessageModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class ConversationService : AbstractService
    { 
        private readonly IMongoCollection<Conversation> _conversationsCollection;

        public ConversationService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _conversationsCollection = _mongoDatabase.GetCollection<Conversation>(
                gigerDatabaseSettings.Value.ConversationsCollectionName);
        }

        public async Task<List<Conversation>> GetAllAsync() =>
            await _conversationsCollection.Find(_ => true).ToListAsync();

        public async Task<Conversation?> GetAsync(string id) =>
            await _conversationsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<List<Conversation>> GetAllWithParticipantAsync(string participant) =>
            await _conversationsCollection.Find(x => x.Participants.Contains(participant) && !x.GigConversation).ToListAsync();

        public async Task<List<Conversation>> GetAllGigConversationsWithParticipantAsync(string participant) =>
            await _conversationsCollection.Find(x => x.Participants.Contains(participant) && x.GigConversation).ToListAsync();

        public async Task CreateAsync(Conversation newConversation) =>
            await _conversationsCollection.InsertOneAsync(newConversation);

        public async Task UpdateAsync(Conversation updatedConversation) =>
            await _conversationsCollection.ReplaceOneAsync(x => x.Id == updatedConversation.Id, updatedConversation);

        public async Task UpsertAsync(Conversation updatedConversation) =>
            await _conversationsCollection.ReplaceOneAsync(x => x.Id == updatedConversation.Id, updatedConversation, new ReplaceOptions() { IsUpsert = true });

        public async Task RemoveAsync(string id) =>
            await _conversationsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
