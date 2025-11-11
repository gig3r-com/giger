using Giger.Models.MessageModels;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class ConversationService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public ConversationService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Conversation>> GetAllAsync() =>
            await _dbContext.Conversations.ToListAsync();

        public async Task<Conversation?> GetAsync(string id) =>
            await _dbContext.Conversations.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<List<Conversation>> GetAllWithParticipantAsync(string participant) =>
            await _dbContext.Conversations
                .Where(x => x.Participants.Contains(participant) && !x.GigConversation)
                .ToListAsync();

        public async Task<List<Conversation>> GetAllGigConversationsWithParticipantAsync(string participant) =>
            await _dbContext.Conversations
                .Where(x => x.Participants.Contains(participant) && x.GigConversation)
                .ToListAsync();

        public async Task CreateAsync(Conversation newConversation)
        {
            _dbContext.Conversations.Add(newConversation);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Conversation updatedConversation)
        {
            _dbContext.Conversations.Update(updatedConversation);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpsertAsync(Conversation updatedConversation)
        {
            var existing = await GetAsync(updatedConversation.Id);
            if (existing == null)
                _dbContext.Conversations.Add(updatedConversation);
            else
                _dbContext.Conversations.Update(updatedConversation);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var conversation = await GetAsync(id);
            if (conversation != null)
            {
                _dbContext.Conversations.Remove(conversation);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
