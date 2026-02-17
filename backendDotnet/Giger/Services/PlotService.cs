using Giger.Models.Plots;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class PlotService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public PlotService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Plot>> GetAllAsync() =>
            await _dbContext.Plots.Include(p => p.PlotUsers).ToListAsync();

        public async Task<Plot?> GetByIdAsync(string id) =>
            await _dbContext.Plots.Include(p => p.PlotUsers).FirstOrDefaultAsync(x => x.Id == id);

        public async Task CreateAsync(Plot newPlot)
        {
            _dbContext.Plots.Add(newPlot);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Plot updatedPlot)
        {
            _dbContext.Plots.Update(updatedPlot);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var plot = await GetByIdAsync(id);
            if (plot != null)
            {
                _dbContext.Plots.Remove(plot);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
