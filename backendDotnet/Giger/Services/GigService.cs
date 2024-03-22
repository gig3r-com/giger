﻿using Giger.Models;
using Giger.Models.GigModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public class GigService : AbstractService
    { 
        private readonly IMongoCollection<Gig> _gigsCollection;

        public GigService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _gigsCollection = _mongoDatabase.GetCollection<Gig>(
                gigerDatabaseSettings.Value.GigsCollectionName);
        }

        public async Task<List<Gig>> GetAllAsync() =>
            await _gigsCollection.Find(_ => true).ToListAsync();

        public async Task<Gig?> GetAsync(int id) =>
            await _gigsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<Gig?> GetByFirstNameAsync(string title) =>
            await _gigsCollection.Find(x => x.Title == title).FirstOrDefaultAsync();

        public async Task CreateAsync(Gig newGig) =>
            await _gigsCollection.InsertOneAsync(newGig);

        public async Task UpdateAsync(int id, Gig updatedGig) =>
            await _gigsCollection.ReplaceOneAsync(x => x.Id == id, updatedGig);

        public async Task UpsertAsync(int id, Gig updatedGig) =>
            await _gigsCollection.ReplaceOneAsync(x => x.Id == id, updatedGig, new ReplaceOptions() { IsUpsert = true });

        public async Task RemoveAsync(int id) =>
            await _gigsCollection.DeleteOneAsync(x => x.Id == id);
    }
}