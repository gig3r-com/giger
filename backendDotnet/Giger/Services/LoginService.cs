using Giger.Models;
using Giger.Models.Auths;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class LoginService : AbstractService
    {
        private readonly IMongoCollection<Auths> _authsCollection;

        public LoginService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _authsCollection = _mongoDatabase.GetCollection<Auths>(
                gigerDatabaseSettings.Value.TransactionsCollectionName);
        }

        public async Task<Auths?> GetByUserNameAsync(string userName) =>
            await _authsCollection.Find(x => x.Username == userName).FirstOrDefaultAsync();

        public async Task<Auths?> GetByAuthTokenAsync(string authToken) =>
            await _authsCollection.Find(x => x.AuthToken == authToken).FirstOrDefaultAsync();

        public async Task CreateAsync(Auths newAuth) =>
            await _authsCollection.InsertOneAsync(newAuth);

        public async Task UpdateAsync(Auths newAuth) =>
            await _authsCollection.ReplaceOneAsync(x => x.Id == newAuth.Id, newAuth);

        public async Task RemoveAsync(string id) =>
            await _authsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
