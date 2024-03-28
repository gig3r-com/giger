using Giger.Models;
using Giger.Models.BankingModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class TransactionService : AbstractService
    { 
        private readonly IMongoCollection<Transaction> _transactionsCollection;

        public TransactionService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        { 
            _transactionsCollection = _mongoDatabase.GetCollection<Transaction>(
                gigerDatabaseSettings.Value.TransactionsCollectionName);
        }

        public async Task<List<Transaction>> GetAllAsync() =>
            await _transactionsCollection.Find(_ => true).ToListAsync();

        public async Task<Transaction?> GetAsync(int id) =>
            await _transactionsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Transaction?> GetByFromAsync(int from) =>
            await _transactionsCollection.Find(x => x.From == from).FirstOrDefaultAsync();

        public async Task<Transaction?> GetByToAsync(int to) =>
            await _transactionsCollection.Find(x => x.To == to).FirstOrDefaultAsync();

        public async Task CreateAsync(Transaction newTransaction) =>
            await _transactionsCollection.InsertOneAsync(newTransaction);

        public async Task UpdateAsync(int id, Transaction updatedTransaction) =>
            await _transactionsCollection.ReplaceOneAsync(x => x.Id == id, updatedTransaction);

        public async Task UpsertAsync(int id, Transaction updatedTransaction) =>
            await _transactionsCollection.ReplaceOneAsync(x => x.Id == id, updatedTransaction, new ReplaceOptions() { IsUpsert = true });

        public async Task RemoveAsync(int id) =>
            await _transactionsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
