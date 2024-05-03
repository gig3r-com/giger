using Giger.Models;
using Giger.Models.Auths;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class LoginService : AbstractService
    {
        private readonly IMongoCollection<Auth> _authsCollection;

        public LoginService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _authsCollection = _mongoDatabase.GetCollection<Auth>(
                gigerDatabaseSettings.Value.AuthsCollectionName);
        }

        public async Task<Auth?> GetByUserNameAsync(string userName) =>
            await _authsCollection.Find(x => x.Username == userName).FirstOrDefaultAsync();

        public async Task<Auth?> GetByHackerNameAsync(string hackerName) =>
            await _authsCollection.Find(x => x.HackerName == hackerName).FirstOrDefaultAsync();

        public async Task<Auth?> GetByAuthTokenAsync(string authToken) =>
            await _authsCollection.Find(x => x.AuthToken == authToken).FirstOrDefaultAsync();

        public async Task CreateAsync(Auth newAuth) =>
            await _authsCollection.InsertOneAsync(newAuth);

        public async Task UpdateAsync(Auth newAuth) =>
            await _authsCollection.ReplaceOneAsync(x => x.Id == newAuth.Id, newAuth);

        public async Task RemoveAsync(string id) =>
            await _authsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
