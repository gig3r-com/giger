using Giger.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class RecordService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public RecordService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<RecordType>> GetByUserIdAsync(string userId) =>
            await _dbContext.Records.Where(r => r.UserId == userId).ToListAsync();

        public async Task<List<RecordType>> GetByUserIdAndGroupAsync(string userId, string recordGroup) =>
            await _dbContext.Records.Where(r => r.UserId == userId && r.RecordGroup == recordGroup).ToListAsync();

        public async Task<RecordType?> GetByIdAsync(string id) =>
            await _dbContext.Records.FirstOrDefaultAsync(r => r.Id == id);

        public async Task CreateAsync(RecordType newRecord)
        {
            _dbContext.Records.Add(newRecord);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(RecordType updatedRecord)
        {
            _dbContext.Records.Update(updatedRecord);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var record = await GetByIdAsync(id);
            if (record != null)
            {
                _dbContext.Records.Remove(record);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
