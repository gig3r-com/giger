using Giger.Models;
using Giger.Models.User;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class UserService
    {
        private readonly IMongoCollection<UserPrivate> _usersCollection;
        
        public UserService(
            IOptions<GigerDbSettings> gigerDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                gigerDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                gigerDatabaseSettings.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<UserPrivate>(
                gigerDatabaseSettings.Value.UsersCollectionName);
        }

        public async Task<List<UserPrivate>> GetAllPrivateUsersAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<UserPrivate?> GetAsync(int id) =>
            await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<UserPrivate?> GetByFirstNameAsync(string firstName, string surname) =>
            await _usersCollection.Find(x => x.Name.Equals(firstName, StringComparison.OrdinalIgnoreCase)
                  && x.Surname.Equals(surname, StringComparison.OrdinalIgnoreCase)).FirstOrDefaultAsync();

        public async Task CreateAsync(UserPrivate newBook) =>
            await _usersCollection.InsertOneAsync(newBook);

        public async Task UpdateAsync(int id, UserPrivate updatedBook) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedBook );

        public async Task UpsertAsync(int id, UserPrivate updatedBook) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedBook, new ReplaceOptions() { IsUpsert = true });

        public async Task RemoveAsync(int id) =>
            await _usersCollection.DeleteOneAsync(x => x.Id == id);
    }
}