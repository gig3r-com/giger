﻿using Giger.Models;
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
                gigerDatabaseSettings.Value.AccountsCollectionName);
        }

        public async Task<List<Account>> GetAllAsync() =>
            await _accountsCollection.Find(_ => true).ToListAsync();

        public async Task<List<Account>> GetAllActiveAsync() =>
            await _accountsCollection.Find(x => x.IsActive).ToListAsync();

        public async Task<Account?> GetSystemAccountAsync() =>
            await _accountsCollection.Find(x => x.Owner == "SYSTEM").FirstOrDefaultAsync();

        public async Task<Account?> GetByIdAsync(string id) =>
            await _accountsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Account?> GetByAccountNameAsync(string owner) =>
            await _accountsCollection.Find(x => x.Owner.Equals(owner, StringComparison.OrdinalIgnoreCase)).FirstOrDefaultAsync();

        public async Task<Account?> GetByUserIdAsync(string ownerId) =>
            await _accountsCollection.Find(x => x.OwnerId == ownerId).FirstOrDefaultAsync();

        public async Task<Account?> GetByAccountNumberAsync(string accountNumber) =>
            await _accountsCollection.Find(x => x.AccountNumber == accountNumber).FirstOrDefaultAsync();

        public async Task CreateAsync(Account newAccount) =>
            await _accountsCollection.InsertOneAsync(newAccount);

        public async Task UpdateAsync(Account updatedAccount) =>
            await _accountsCollection.ReplaceOneAsync(x => x.Id == updatedAccount.Id, updatedAccount);

        public async Task RemoveAsync(string id) =>
            await _accountsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
