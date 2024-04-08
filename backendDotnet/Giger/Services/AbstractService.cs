﻿using Giger.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Giger.Services
{
    public abstract class AbstractService
    {
        protected IMongoDatabase _mongoDatabase;

        public AbstractService(IOptions<GigerDbSettings> gigerDatabaseSettings)
        {
            var MongoSettings = new MongoClientSettings()
            {
                Server = new MongoServerAddress(gigerDatabaseSettings.Value.Host, gigerDatabaseSettings.Value.Port),
                Credential = MongoCredential.CreateCredential(
                    gigerDatabaseSettings.Value.DatabaseName,
                    gigerDatabaseSettings.Value.Username,
                    gigerDatabaseSettings.Value.Password)
            };
            var mongoClient = new MongoClient(MongoSettings);

            _mongoDatabase = mongoClient.GetDatabase(
                gigerDatabaseSettings.Value.DatabaseName);
        }
    }
}
