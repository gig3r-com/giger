using Giger.Models;
using Giger.Models.UserModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class UserService
    {
        private readonly IMongoCollection<UserPrivate> _usersCollection;

        public UserService(
            IOptions<GigerDbSettings> bookStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                bookStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                bookStoreDatabaseSettings.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<UserPrivate>(
                bookStoreDatabaseSettings.Value.UsersCollectionName);
        }

        public async Task<List<UserPrivate>> GetAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<UserPrivate?> GetAsync(int id) =>
            await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<UserPrivate?> GetByFirstNameAsync(string firstName) =>
            await _usersCollection.Find(x => x.FirstName == firstName).FirstOrDefaultAsync();

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
