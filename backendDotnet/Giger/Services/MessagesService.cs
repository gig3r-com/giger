using Giger.Models.MessageModels;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class MessagesService : IGigerService
    {
        private readonly GigerDbContext _dbContext;
        public MessagesService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateMessageAsync(Message msg)
        {
            _dbContext.Messages.Add(msg);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Message msg)
        {
            _dbContext.Messages.Update(msg);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string messageId)
        {
            var msg = await _dbContext.Messages.FindAsync(messageId);
            if (msg != null)
            {
                _dbContext.Messages.Remove(msg);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<Message?> GetByIdAsync(string messageId)
        {
            return await _dbContext.Messages.FindAsync(messageId);
        }

        public async Task<List<Message>> GetAllForConversationAsync(string conversationId)
        {
            return await _dbContext.Messages.Where(rt => rt.ConversationId == conversationId).ToListAsync();
        }
    }
}