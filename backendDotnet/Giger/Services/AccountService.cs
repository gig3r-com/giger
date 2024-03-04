using Giger.Models;
using Giger.Models.BankingModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class AccountService : AbstractService
    { 
        private readonly IMongoCollection<Account> _accountsCollection;

        public AccountService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _accountsCollection = _mongoDatabase.GetCollection<Account>(
                gigerDatabaseSettings.Value.GigsCollectionName);
        }

        public async Task<List<Account>> GetAllAsync() =>
            await _accountsCollection.Find(_ => true).ToListAsync();

        public async Task<Account?> GetAsync(int id) =>
            await _accountsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Account?> GetByFirstNameAsync(int owner) =>
            await _accountsCollection.Find(x => x.Owner == owner).FirstOrDefaultAsync();

        public async Task CreateAsync(Account newAccount) =>
            await _accountsCollection.InsertOneAsync(newAccount);

        public async Task UpdateAsync(int id, Account updatedAccount) =>
            await _accountsCollection.ReplaceOneAsync(x => x.Id == id, updatedAccount);

        public async Task UpsertAsync(int id, Account updatedAccount) =>
            await _accountsCollection.ReplaceOneAsync(x => x.Id == id, updatedAccount, new ReplaceOptions() { IsUpsert = true });

        public async Task RemoveAsync(int id) =>
            await _accountsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
