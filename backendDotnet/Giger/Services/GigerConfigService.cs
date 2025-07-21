using Giger.Models;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class GigerConfigService
    {
        private readonly GigerDbContext _dbContext;

        public GigerConfigService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<GigerConfig?> Get() =>
            await _dbContext.Set<GigerConfig>().FirstOrDefaultAsync();

        public async Task UpdateAsync(GigerConfig config)
        {
            _dbContext.Set<GigerConfig>().Update(config);
            await _dbContext.SaveChangesAsync();
        }
    }
}
