using Giger.Models.Hacking;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class HackConfigService
    {
        private readonly GigerDbContext _dbContext;

        public HackConfigService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<HackConfig>> GetAll() =>
            await _dbContext.HackConfig.ToListAsync();

        public async Task<HackConfig?> GetById(string id) =>
            await _dbContext.HackConfig.FirstOrDefaultAsync(x => x.Id == id);

        public async Task CreateAsync(HackConfig newConfig)
        {
            _dbContext.HackConfig.Add(newConfig);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(HackConfig updatedConfig)
        {
            _dbContext.HackConfig.Update(updatedConfig);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var config = await GetById(id);
            if (config != null)
            {
                _dbContext.HackConfig.Remove(config);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
