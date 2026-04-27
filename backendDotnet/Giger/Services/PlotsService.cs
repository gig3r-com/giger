using Giger.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class PlotsService : IGigerService
    {
        private readonly GigerDbContext _dbContext;
        public PlotsService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateRecordTypeAsync(Plot plot)
        {
            _dbContext.Plots.Add(plot);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Plot plot)
        {
            _dbContext.Plots.Update(plot);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string plotId)
        {
            var plot = await _dbContext.Plots.FindAsync(plotId);
            if (plot != null)
            {
                _dbContext.Plots.Remove(plot);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<Plot?> GetByIdAsync(string plotId)
        {
            return await _dbContext.Plots.FindAsync(plotId);
        }

        public async Task<List<Plot>> GetAllForUserAsync(string userHandle)
        {
            return  await _dbContext.Plots.Where(rt => rt.Users.Contains(userHandle)).ToListAsync();
        }
    }
}
