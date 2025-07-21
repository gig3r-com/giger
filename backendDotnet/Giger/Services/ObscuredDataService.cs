using Giger.Models.Obscured;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class ObscuredDataService
    {
        private readonly GigerDbContext _dbContext;

        public ObscuredDataService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<ObscuredCodesMap>> GetAllAsync() =>
            await _dbContext.ObscuredCodesMap.ToListAsync();

        public async Task<ObscuredCodesMap?> GetByIdAsync(string id) =>
            await _dbContext.ObscuredCodesMap.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<ObscuredCodesMap?> GetByObscurableIdAsync(string obscurableId) =>
            await _dbContext.ObscuredCodesMap.FirstOrDefaultAsync(x => x.ObscurableId == obscurableId);

        public async Task<ObscuredCodesMap?> GetByCodeAndUserAsync(string revealCode, string username) =>
            await _dbContext.ObscuredCodesMap.FirstOrDefaultAsync(x => x.ExpectedRevealCode == revealCode &&
                        (x.Username == username || string.IsNullOrEmpty(x.Username)));

        public async Task<List<ObscuredCodesMap>> GetByCodeAndUserAsyncList(string revealCode, string username) =>
            await _dbContext.ObscuredCodesMap.Where(x => x.ExpectedRevealCode == revealCode &&
                        (x.Username == username || string.IsNullOrEmpty(x.Username))).ToListAsync();

        public async Task<ObscuredCodesMap?> GetByRevealCodeIdAsync(string revealCode) =>
            await _dbContext.ObscuredCodesMap.FirstOrDefaultAsync(x => x.ExpectedRevealCode == revealCode);

        public async Task CreateAsync(ObscuredCodesMap newObscuredRevealedMap)
        {
            _dbContext.ObscuredCodesMap.Add(newObscuredRevealedMap);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(ObscuredCodesMap updatedObscuredRevealedMap)
        {
            _dbContext.ObscuredCodesMap.Update(updatedObscuredRevealedMap);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var map = await GetByIdAsync(id);
            if (map != null)
            {
                _dbContext.ObscuredCodesMap.Remove(map);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}