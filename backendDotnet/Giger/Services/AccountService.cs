using Giger.Models.BankingModels;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class AccountService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public AccountService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Account>> GetAllAsync() =>
            await _dbContext.Accounts.Include(a => a.Owners).ToListAsync();

        public async Task<Account?> GetSystemAccountAsync() =>
            await _dbContext.Accounts
                .Include(a => a.Owners)
                .FirstOrDefaultAsync(x => x.Owners.Any(o => o.UserHandle == "SYSTEM"));

        public async Task<Account?> GetByIdAsync(string id) =>
            await _dbContext.Accounts
                .Include(a => a.Owners)
                .Include(a => a.Transactions)
                .FirstOrDefaultAsync(x => x.Id == id);

        public async Task<Account?> GetByOwnerHandleAsync(string ownerHandle) =>
            await _dbContext.Accounts
                .Include(a => a.Owners)
                .Include(a => a.Transactions)
                .FirstOrDefaultAsync(x => x.Owners.Any(o => o.UserHandle.Equals(ownerHandle, StringComparison.OrdinalIgnoreCase)));

        public async Task<Account?> GetByAccountNumberAsync(string accountNumber) =>
            await _dbContext.Accounts
                .Include(a => a.Owners)
                .Include(a => a.Transactions)
                .FirstOrDefaultAsync(x => x.AccountNumber == accountNumber);

        public async Task CreateAsync(Account newAccount)
        {
            _dbContext.Accounts.Add(newAccount);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Account updatedAccount)
        {
            _dbContext.Accounts.Update(updatedAccount);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var account = await GetByIdAsync(id);
            if (account != null)
            {
                _dbContext.Accounts.Remove(account);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
