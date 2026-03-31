using Giger.Models.BankingModels;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class TransactionService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public TransactionService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Transaction>> GetAllAsync() =>
            await _dbContext.Transactions.ToListAsync();

        public async Task<List<Transaction>> GetAllMatchingAccountAsync(string accountNumber) =>
            await _dbContext.Transactions.Where(t => t.To.Equals(accountNumber) || t.From.Equals(accountNumber)).ToListAsync();

        public async Task<Transaction?> GetByIdAsync(string id) =>
            await _dbContext.Transactions.FirstOrDefaultAsync(x => x.Id == id);

        public async Task CreateAsync(Transaction newTransaction)
        {
            _dbContext.Transactions.Add(newTransaction);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Transaction updatedTransaction)
        {
            _dbContext.Transactions.Update(updatedTransaction);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var transaction = await GetByIdAsync(id);
            if (transaction != null)
            {
                _dbContext.Transactions.Remove(transaction);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
