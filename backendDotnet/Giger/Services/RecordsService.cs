using Giger.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class RecordsService : IGigerService
    {
        private readonly GigerDbContext _dbContext;
        public RecordsService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateRecordTypeAsync(RecordType record)
        {
            _dbContext.RecordTypes.Add(record);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(RecordType record)
        {
            _dbContext.RecordTypes.Update(record);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string recordId)
        {
            var record = await _dbContext.RecordTypes.FindAsync(recordId);
            if (record != null)
            {
                _dbContext.RecordTypes.Remove(record);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<RecordType?> GetByIdAsync(string recordId)
        {
            return await _dbContext.RecordTypes.FindAsync(recordId);
        }

        public async Task<List<RecordType>> GetAllForUserAsync(string userHandle)
        {
            return  await _dbContext.RecordTypes.Where(rt => rt.User == userHandle).ToListAsync();
        }
    }
}
