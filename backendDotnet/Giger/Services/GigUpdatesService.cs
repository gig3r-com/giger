using Giger.Models.GigModels;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class GigUpdatesService : IGigerService
    {
        private readonly GigerDbContext _dbContext;
        public GigUpdatesService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateRecordTypeAsync(GigUpdate gigUpdate)
        {
            _dbContext.GigUpdates.Add(gigUpdate);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(GigUpdate gigUpdate)
        {
            _dbContext.GigUpdates.Update(gigUpdate);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string gigUpdateId)
        {
            var gigUpdate = await _dbContext.GigUpdates.FindAsync(gigUpdateId);
            if (gigUpdate != null)
            {
                _dbContext.GigUpdates.Remove(gigUpdate);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<GigUpdate?> GetByIdAsync(string gigUpdateId)
        {
            return await _dbContext.GigUpdates.FindAsync(gigUpdateId);
        }

        public async Task<List<GigUpdate>> GetAllForGigAsync(string gigId)
        {
            return  await _dbContext.GigUpdates.Where(rt => rt.GigFK == gigId).ToListAsync();
        }
    }
}
