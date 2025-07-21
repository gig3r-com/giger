using Giger.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class AnonymizedService
    {
        private readonly GigerDbContext _dbContext;

        public AnonymizedService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<AnonymizedUser>> GetAllAsync() =>
            await _dbContext.AnonymizedUsers.ToListAsync();

        public async Task<List<AnonymizedUser>> GetAllOfSameUserAsync(string userId) =>
            await _dbContext.AnonymizedUsers.Where(x => x.UserId == userId).ToListAsync();

        public async Task<AnonymizedUser?> GetByAnonymizedNameIdAsync(string displayedAs) =>
            await _dbContext.AnonymizedUsers.FirstOrDefaultAsync(x => x.DisplyedAs == displayedAs);

        public async Task<AnonymizedUser?> GetByIdAsync(string id) =>
            await _dbContext.AnonymizedUsers.FirstOrDefaultAsync(x => x.Id == id);

        public async Task CreateAsync(AnonymizedUser newAnonymizedUser)
        {
            _dbContext.AnonymizedUsers.Add(newAnonymizedUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(AnonymizedUser newAnonymizedUser)
        {
            _dbContext.AnonymizedUsers.Update(newAnonymizedUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var anonymizedUser = await GetByIdAsync(id);
            if (anonymizedUser != null)
            {
                _dbContext.AnonymizedUsers.Remove(anonymizedUser);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
