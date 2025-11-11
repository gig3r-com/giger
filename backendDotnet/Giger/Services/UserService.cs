using Giger.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class UserService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public UserService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<UserPrivate>> GetAllPrivateUsersAsync() =>
            await _dbContext.Users.ToListAsync();

        public async Task<UserPrivate?> GetAsync(string userId) =>
            await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);

        public async Task<UserPrivate?> GetByUserNameAsync(string userHandle) =>
            await _dbContext.Users.FirstOrDefaultAsync(x => x.Handle.Equals(userHandle, System.StringComparison.OrdinalIgnoreCase));

        public async Task<List<UserPrivate>> GetAllFactionUser(Factions faction) =>
            await _dbContext.Users.Where(x => x.Faction == faction).ToListAsync();

        public async Task CreateAsync(UserPrivate newUser)
        {
            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(UserPrivate updatedUser)
        {
            _dbContext.Users.Update(updatedUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpsertAsync(UserPrivate updatedUser)
        {
            var existing = await GetAsync(updatedUser.Id);
            if (existing == null)
                _dbContext.Users.Add(updatedUser);
            else
                _dbContext.Users.Update(updatedUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string userId)
        {
            var user = await GetAsync(userId);
            if (user != null)
            {
                _dbContext.Users.Remove(user);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}