﻿using Giger.Models;
using Giger.Models.User;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class UserService : AbstractService
    {
        private readonly IMongoCollection<UserPrivate> _usersCollection;
        
        public UserService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _usersCollection = _mongoDatabase.GetCollection<UserPrivate>(
                gigerDatabaseSettings.Value.UsersCollectionName);
        }

        public async Task<List<UserPrivate>> GetAllPrivateUsersAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<UserPrivate?> GetAsync(string userId) =>
            await _usersCollection.Find(x => x.Id == userId).FirstOrDefaultAsync();

        public async Task<UserPrivate?> GetByUserNameAsync(string userHandle) =>
            await _usersCollection.Find(x => x.Handle.Equals(userHandle, StringComparison.OrdinalIgnoreCase)).FirstOrDefaultAsync();
        
        public async Task<List<UserPrivate>> GetAllFactionUser(Factions faction) =>
            await _usersCollection.Find(x => x.Faction == faction).ToListAsync();

        public async Task CreateAsync(UserPrivate newUser) =>
            await _usersCollection.InsertOneAsync(newUser);

        public async Task UpdateAsync(UserPrivate updatedUser) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == updatedUser.Id, updatedUser );

        public async Task UpsertAsync(UserPrivate updatedUser) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == updatedUser.Id, updatedUser, new ReplaceOptions() { IsUpsert = true });

        public async Task RemoveAsync(string userId) =>
            await _usersCollection.DeleteOneAsync(x => x.Id == userId);
    }
}