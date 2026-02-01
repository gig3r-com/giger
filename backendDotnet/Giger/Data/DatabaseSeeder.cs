using Giger.Models.Auths;
using Giger.Services;
using Microsoft.EntityFrameworkCore;

namespace Giger.Data
{
    public static class DatabaseSeeder
    {
        public static void SeedDatabase(GigerDbContext context, ILogger logger, bool forceReload = false)
        {
            try
            {
                logger.LogInformation("Starting database seeding...");

                // Check if we should force reload (useful for development)
                var forceReloadEnv = Environment.GetEnvironmentVariable("FORCE_DATA_RELOAD");
                if (!string.IsNullOrEmpty(forceReloadEnv) && 
                    (forceReloadEnv.ToLower() == "true" || forceReloadEnv == "1"))
                {
                    logger.LogWarning("FORCE_DATA_RELOAD is set. Clearing existing data...");
                    forceReload = true;
                    
                    // Clear all tables - only clear tables that exist
                    try
                    {
                        context.Auths.RemoveRange(context.Auths);
                        context.Accounts.RemoveRange(context.Accounts);
                        context.Networks.RemoveRange(context.Networks);
                        context.Subnetworks.RemoveRange(context.Subnetworks);
                        context.HackConfig.RemoveRange(context.HackConfig);
                        context.ProgramCodes.RemoveRange(context.ProgramCodes);
                        context.ObscuredCodesMap.RemoveRange(context.ObscuredCodesMap);
                        context.Logs.RemoveRange(context.Logs);
                        context.Conversations.RemoveRange(context.Conversations);
                        context.Messages.RemoveRange(context.Messages);
                        context.AnonymizedUsers.RemoveRange(context.AnonymizedUsers);
                        context.Transactions.RemoveRange(context.Transactions);
                        context.SaveChanges();
                        logger.LogInformation("Existing data cleared.");
                    }
                    catch (Exception ex)
                    {
                        logger.LogWarning(ex, "Error clearing data, will attempt to reload anyway.");
                    }
                }

                // Check if database already has data
                if (!forceReload && context.Auths.Any())
                {
                    logger.LogInformation("Database already contains data. Skipping seed.");
                    logger.LogInformation("To reload data, set environment variable FORCE_DATA_RELOAD=true");
                    return;
                }

                // Try to load from JSON files first
                JsonDataLoader.LoadFromJsonFiles(context, logger, "/data");

                // Create accounts for users who don't have one
                CreateMissingAccounts(context, logger);

                // If no data was loaded, seed with default admin user
                if (!context.Auths.Any())
                {
                    logger.LogInformation("No JSON data found. Creating default admin user...");
                    
                    var adminAuth = new Auth
                    {
                        Id = "1fe35579-5ce7-46ec-89e0-7e7236700297",
                        Username = "admin",
                        Password = "admin", // In production, use proper password hashing
                        HackerName = null,
                        AuthToken = null
                    };

                    context.Auths.Add(adminAuth);
                    context.SaveChanges();

                    logger.LogInformation("Default admin user created - Username: admin, Password: admin");
                    logger.LogWarning("IMPORTANT: Change the default admin password in production!");
                }
                else
                {
                    logger.LogInformation($"Database seeded with {context.Auths.Count()} auth entries.");
                }

                logger.LogInformation("Database seeding completed successfully.");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }

        private static void CreateMissingAccounts(GigerDbContext context, ILogger logger)
        {
            try
            {
                logger.LogInformation("Checking for users without bank accounts...");
                
                // Get all users
                var allUsers = context.UsersPublic.ToList();
                logger.LogInformation($"Found {allUsers.Count} total users");
                
                // Get all existing account owners
                var existingAccountOwners = context.Accounts
                    .Select(a => a.Owner.ToLower())
                    .ToHashSet();
                
                // Find users without accounts
                var usersWithoutAccounts = allUsers
                    .Where(u => !existingAccountOwners.Contains(u.Handle.ToLower()))
                    .ToList();
                
                if (usersWithoutAccounts.Count == 0)
                {
                    logger.LogInformation("All users already have bank accounts");
                    return;
                }
                
                logger.LogInformation($"Creating accounts for {usersWithoutAccounts.Count} users...");
                
                var random = new Random();
                foreach (var user in usersWithoutAccounts)
                {
                    var account = new Models.BankingModels.Account
                    {
                        Id = Guid.NewGuid().ToString(),
                        Owner = user.Handle,
                        OwnerId = user.Id,
                        AccountNumber = random.Next(100000, 999999999).ToString(),
                        Balance = 1000, // Starting balance
                        Type = Models.BankingModels.AccountType.PRIVATE,
                        IsActive = true,
                        Transactions = new List<Models.BankingModels.Transaction>()
                    };
                    
                    context.Accounts.Add(account);
                }
                
                context.SaveChanges();
                logger.LogInformation($"Created {usersWithoutAccounts.Count} new bank accounts");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error creating missing accounts");
            }
        }
    }
}
