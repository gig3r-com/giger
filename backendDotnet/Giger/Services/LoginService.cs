using Giger.Models.Auths;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class LoginService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public LoginService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Auth?> GetByUserNameAsync(string userName)
        {
            return await _dbContext.Auths.FirstOrDefaultAsync(x => x.Username.ToLower() == userName.ToLower());// .Equals(userName, System.StringComparison.OrdinalIgnoreCase));
        }

        public async Task<Auth?> GetByHackerNameAsync(string hackerName) =>
            await _dbContext.Auths.FirstOrDefaultAsync(x => x.HackerName.Equals(hackerName, System.StringComparison.OrdinalIgnoreCase));

        public async Task<Auth?> GetByAuthTokenAsync(string authToken) =>
            await _dbContext.Auths.FirstOrDefaultAsync(x => x.AuthToken == authToken);

        public async Task CreateAsync(Auth newAuth)
        {
            _dbContext.Auths.Add(newAuth);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Auth updatedAuth)
        {
            _dbContext.Auths.Update(updatedAuth);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var auth = await _dbContext.Auths.FirstOrDefaultAsync(x => x.Id == id);
            if (auth != null)
            {
                _dbContext.Auths.Remove(auth);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
