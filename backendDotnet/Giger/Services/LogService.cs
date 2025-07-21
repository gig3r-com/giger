using Giger.Models.Logs;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class LogService
    {
        private readonly GigerDbContext _dbContext;

        public LogService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Log>> GetAllForSubnetworkAsync(string subnetworkId) =>
            await _dbContext.Logs.Where(x => x.SubnetworkId == subnetworkId).ToListAsync();

        public async Task<Log?> GetByIdAsync(string id) =>
            await _dbContext.Logs.FirstOrDefaultAsync(x => x.Id == id);

        public async Task CreateAsync(Log newLog)
        {
            _dbContext.Logs.Add(newLog);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Log updatedLog)
        {
            _dbContext.Logs.Update(updatedLog);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var log = await GetByIdAsync(id);
            if (log != null)
            {
                _dbContext.Logs.Remove(log);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
