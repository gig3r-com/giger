using Giger.Models.Hacking;
using Giger.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class ProgramCodesService : AbstractService
    {
        private readonly IMongoCollection<ProgramCodes> _programCodesCollection;

        public ProgramCodesService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _programCodesCollection = _mongoDatabase.GetCollection<ProgramCodes>(
                gigerDatabaseSettings.Value.HackConfigCollectionName);
        }

        public async Task<List<ProgramCodes>> GetAll() =>
            await _programCodesCollection.Find(_ => true).ToListAsync();

        public async Task<ProgramCodes?> GetById(string id) =>
            await _programCodesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<ProgramCodes?> GetByCode(string code) =>
            await _programCodesCollection.Find(x => x.ProgramCode == code).FirstOrDefaultAsync();

        public async Task CreateAsync(ProgramCodes newAuth) =>
            await _programCodesCollection.InsertOneAsync(newAuth);

        public async Task UpdateAsync(ProgramCodes newAuth) =>
            await _programCodesCollection.ReplaceOneAsync(x => x.Id == newAuth.Id, newAuth);

        public async Task RemoveAsync(string id) =>
            await _programCodesCollection.DeleteOneAsync(x => x.Id == id);
    }
}