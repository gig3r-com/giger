using Giger.Models.Hacking;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class ProgramCodesService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public ProgramCodesService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<ProgramCodes>> GetAll() =>
            await _dbContext.ProgramCodes.ToListAsync();

        public async Task<ProgramCodes?> GetById(string id) =>
            await _dbContext.ProgramCodes.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<ProgramCodes?> GetByCode(string code) =>
            await _dbContext.ProgramCodes.FirstOrDefaultAsync(x => x.ProgramCode == code);

        public async Task CreateAsync(ProgramCodes newCode)
        {
            _dbContext.ProgramCodes.Add(newCode);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(ProgramCodes updatedCode)
        {
            _dbContext.ProgramCodes.Update(updatedCode);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var code = await GetById(id);
            if (code != null)
            {
                _dbContext.ProgramCodes.Remove(code);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}