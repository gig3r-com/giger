using Giger.Models.Auths;
using Giger.Models.BankingModels;
using Giger.Models.GigModels;
using Giger.Models.Hacking;
using Giger.Models.Logs;
using Giger.Models.MessageModels;
using Giger.Models.Networks;
using Giger.Models.Obscured;
using Giger.Models.User;
using Giger.Services;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Giger.Data
{
    public static class JsonDataLoader
    {
        public static void LoadFromJsonFiles(GigerDbContext context, ILogger logger, string dataPath = "/data")
        {
            try
            {
                logger.LogInformation($"Loading data from JSON files in {dataPath}...");

                if (!Directory.Exists(dataPath))
                {
                    logger.LogWarning($"Data directory {dataPath} does not exist. Skipping JSON data load.");
                    return;
                }

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    Converters = { 
                        new UtcDateTimeConverter(),
                        new FlattenStringListConverter(),
                        new NullableBooleanConverter()
                    }
                };

                // Load in order to respect foreign key dependencies
                
                // 1. Independent tables first
                LoadJsonFile<Auth>(context, logger, Path.Combine(dataPath, "Auths.json"), 
                    context.Auths, options);

                LoadJsonFile<Network>(context, logger, Path.Combine(dataPath, "Networks.json"),
                    context.Networks, options);

                LoadJsonFile<Subnetwork>(context, logger, Path.Combine(dataPath, "Subnetworks.json"),
                    context.Subnetworks, options);

                LoadJsonFile<HackConfig>(context, logger, Path.Combine(dataPath, "HackConfigs.json"),
                    context.HackConfig, options);

                LoadJsonFile<ProgramCodes>(context, logger, Path.Combine(dataPath, "ProgramCodesMap.json"),
                    context.ProgramCodes, options);

                LoadJsonFile<ObscuredCodesMap>(context, logger, Path.Combine(dataPath, "ObscuredCodesMap.json"),
                    context.ObscuredCodesMap, options);

                // 2. Then dependent tables
                LoadJsonFile<Account>(context, logger, Path.Combine(dataPath, "Accounts.json"),
                    context.Accounts, options);

                LoadJsonFile<Log>(context, logger, Path.Combine(dataPath, "Logs.json"),
                    context.Logs, options);

                LoadJsonFile<Conversation>(context, logger, Path.Combine(dataPath, "Conversations.json"),
                    context.Conversations, options);

                LoadJsonFile<Gig>(context, logger, Path.Combine(dataPath, "Gigs.json"),
                    context.Gigs, options);

                LoadJsonFile<AnonymizedUser>(context, logger, Path.Combine(dataPath, "Anonymized.json"),
                    context.AnonymizedUsers, options);

                // Users.json - DISABLED DUE TO MODEL ISSUES
                // Issue: EF Core doesn't support array[] for navigation properties (Relations, Goals, etc.)
                // Need to convert all controller methods from returning arrays to Lists
                // OR keep arrays and manually handle JSON deserialization without EF
                // LoadJsonFile<UserPrivate>(context, logger, Path.Combine(dataPath, "Users.json"),
                //     context.Users, options);

                logger.LogInformation("JSON data loading completed successfully.");
                
                // Log summary
                logger.LogInformation($"Data loaded: {context.Auths.Count()} Auths, " +
                    $"{context.Networks.Count()} Networks, " +
                    $"{context.Accounts.Count()} Accounts, " +
                    $"{context.Gigs.Count()} Gigs, " +
                    $"{context.Conversations.Count()} Conversations");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while loading JSON data.");
                throw;
            }
        }

        private static void LoadJsonFile<T>(
            GigerDbContext context,
            ILogger logger,
            string filePath,
            Microsoft.EntityFrameworkCore.DbSet<T> dbSet,
            JsonSerializerOptions options) where T : class
        {
            try
            {
                if (!File.Exists(filePath))
                {
                    logger.LogWarning($"File {filePath} not found. Skipping.");
                    return;
                }

                var json = File.ReadAllText(filePath);
                
                // Convert MongoDB _id to PostgreSQL Id
                json = MongoJsonConverter.ConvertMongoToPostgres(json);
                
                var items = JsonSerializer.Deserialize<List<T>>(json, options);

                if (items == null || items.Count == 0)
                {
                    logger.LogInformation($"No items found in {Path.GetFileName(filePath)}.");
                    return;
                }

                logger.LogInformation($"Loading {items.Count} items from {Path.GetFileName(filePath)}...");

                // Try bulk insert first
                try
                {
                    dbSet.AddRange(items);
                    context.SaveChanges();
                    context.ChangeTracker.Clear();
                    logger.LogInformation($"Successfully loaded {items.Count} items from {Path.GetFileName(filePath)}.");
                    return;
                }
                catch (InvalidOperationException ex) when (ex.Message.Contains("cannot be tracked"))
                {
                    // Tracking conflict - fall back to one-by-one insertion
                    logger.LogWarning($"Tracking conflict detected, switching to one-by-one insertion for {Path.GetFileName(filePath)}");
                    context.ChangeTracker.Clear();
                }
                catch (DbUpdateException ex) when (ex.InnerException?.Message?.Contains("duplicate key") == true)
                {
                    // Duplicate key - fall back to one-by-one insertion
                    logger.LogWarning($"Duplicate key detected, switching to one-by-one insertion for {Path.GetFileName(filePath)}");
                    context.ChangeTracker.Clear();
                }
                
                // Fall back: Add items one by one
                int addedCount = 0;
                foreach (var item in items)
                {
                    try
                    {
                        dbSet.Add(item);
                        context.SaveChanges();
                        context.ChangeTracker.Clear();
                        addedCount++;
                    }
                    catch (Exception)
                    {
                        // Skip items that fail (duplicates or conflicts)
                        context.ChangeTracker.Clear();
                    }
                }

                logger.LogInformation($"Successfully loaded {addedCount} items from {Path.GetFileName(filePath)} (skipped {items.Count - addedCount} duplicates/conflicts).");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error loading {filePath}: {ex.Message}");
                // Continue with other files even if one fails
            }
        }
    }
}
