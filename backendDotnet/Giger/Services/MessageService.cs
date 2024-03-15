//using Giger.Models;
//using Giger.Models.GigModels;
//using Microsoft.Extensions.Options;
//using MongoDB.Driver;

//namespace Giger.Services
//{
//    public class MessageService // TODO - as last, this might not be needed
//    { 
//        private readonly IMongoCollection<GigBase> _gigsCollection;

//        public MessageService(IOptions<GigerDbSettings> gigerDatabaseSettings)
//        {
//            var mongoClient = new MongoClient(
//                gigerDatabaseSettings.Value.ConnectionString);

//            var mongoDatabase = mongoClient.GetDatabase(
//                gigerDatabaseSettings.Value.DatabaseName);

//            _gigsCollection = mongoDatabase.GetCollection<GigBase>(
//                gigerDatabaseSettings.Value.GigsCollectionName);
//        }

//        public async Task<List<GigBase>> GetAllAsync() =>
//            await _gigsCollection.Find(_ => true).ToListAsync();

//        public async Task<GigBase?> GetAsync(int id) =>
//            await _gigsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

//        public async Task<GigBase?> GetByFirstNameAsync(string title) =>
//            await _gigsCollection.Find(x => x.Title == title).FirstOrDefaultAsync();

//        public async Task CreateAsync(GigBase newGig) =>
//            await _gigsCollection.InsertOneAsync(newGig);

//        public async Task UpdateAsync(int id, GigBase updatedGig) =>
//            await _gigsCollection.ReplaceOneAsync(x => x.Id == id, updatedGig);

//        public async Task UpsertAsync(int id, GigBase updatedGig) =>
//            await _gigsCollection.ReplaceOneAsync(x => x.Id == id, updatedGig, new ReplaceOptions() { IsUpsert = true });

//        public async Task RemoveAsync(int id) =>
//            await _gigsCollection.DeleteOneAsync(x => x.Id == id);
//    }
//}
