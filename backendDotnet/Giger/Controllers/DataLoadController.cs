using Giger.Data;
using Giger.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Giger.Models.Auths;
using Giger.Models.BankingModels;
using Giger.Models.GigModels;
using Giger.Models.Hacking;
using Giger.Models.Logs;
using Giger.Models.MessageModels;
using Giger.Models.Networks;
using Giger.Models.Obscured;
using Giger.Models.User;
using System.Text;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataLoadController : Controller
    {
        private readonly GigerDbContext _context;
        private readonly ILogger<DataLoadController> _logger;
        private readonly IConfiguration _configuration;

        public DataLoadController(GigerDbContext context, ILogger<DataLoadController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        private bool CheckBasicAuth()
        {
            var requiredUser = _configuration["DataLoad:Username"];
            var requiredPass = _configuration["DataLoad:Password"];

            // If no credentials configured, allow access (backward compatibility)
            if (string.IsNullOrEmpty(requiredUser) || string.IsNullOrEmpty(requiredPass))
            {
                _logger.LogWarning("DataLoad endpoints have no authentication configured. Set DataLoad:Username and DataLoad:Password.");
                return true;
            }

            var authHeader = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Basic "))
            {
                Response.Headers["WWW-Authenticate"] = "Basic realm=\"Data Load API\"";
                Response.StatusCode = 401;
                return false;
            }

            try
            {
                var encodedCreds = authHeader.Substring("Basic ".Length).Trim();
                var decodedCreds = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCreds));
                var credentials = decodedCreds.Split(':', 2);

                if (credentials.Length != 2 || credentials[0] != requiredUser || credentials[1] != requiredPass)
                {
                    Response.StatusCode = 401;
                    return false;
                }

                return true;
            }
            catch
            {
                Response.StatusCode = 401;
                return false;
            }
        }

        private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.Never,
            Converters = {
                new UtcDateTimeConverter(),
                new FlattenStringListConverter(),
                new NullableBooleanConverter()
            }
        };

        // Helper to deduplicate and handle null IDs
        private T[] PreprocessData<T>(T[] data, Func<T, string?> getId, Func<T, string, T> setId, string entityName)
        {
            // First pass: generate IDs for null entries
            var withIds = data.Select(item =>
            {
                var id = getId(item);
                if (string.IsNullOrEmpty(id))
                {
                    var newId = Guid.NewGuid().ToString();
                    _logger.LogWarning($"Generated ID {newId} for {entityName}");
                    return setId(item, newId);
                }
                return item;
            }).ToArray();

            // Second pass: deduplicate by ID (keep last occurrence)
            var deduped = withIds
                .GroupBy(getId)
                .Select(group =>
                {
                    if (group.Count() > 1)
                    {
                        _logger.LogWarning($"Duplicate ID {group.Key} in {entityName} found {group.Count()} times, keeping last occurrence");
                    }
                    return group.Last();
                })
                .ToArray();

            return deduped;
        }

        [HttpPost("load-auths")]
        public async Task<IActionResult> LoadAuths([FromBody] Auth[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data, 
                    item => item.Id, 
                    (item, id) => { item.Id = id; return item; },
                    "Auth");

                // Get existing IDs without tracking
                var existingIds = new HashSet<string>(
                    await _context.Auths.AsNoTracking().Select(a => a.Id).ToListAsync()
                );
                
                // Filter out duplicates
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.Auths.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new auth records out of {data.Length} total (after preprocessing: {processed.Length}) (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Auths loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading auths");
                return StatusCode(500, new { message = "Error loading auths", error = ex.Message });
            }
        }

        [HttpPost("load-users")]
        public async Task<IActionResult> LoadUsers([FromBody] UserPrivate[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "User");

                var existingIds = new HashSet<string>(
                    await _context.Users.AsNoTracking().Select(u => u.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id!)).ToList();
                
                if (toAdd.Any())
                {
                    _context.Users.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new users out of {data.Length} total (after preprocessing: {processed.Length}) (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Users loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading users");
                return StatusCode(500, new { message = "Error loading users", error = ex.Message });
            }
        }

        [HttpPost("load-accounts")]
        public async Task<IActionResult> LoadAccounts([FromBody] Account[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "Account");

                // GLOBAL transaction deduplication across all accounts
                var seenTransactions = new HashSet<string>();
                foreach (var account in processed)
                {
                    if (account.Transactions.Any())
                    {
                        var uniqueTransactions = new List<Transaction>();
                        foreach (var tx in account.Transactions)
                        {
                            if (!seenTransactions.Contains(tx.Id))
                            {
                                seenTransactions.Add(tx.Id);
                                uniqueTransactions.Add(tx);
                            }
                            else
                            {
                                _logger.LogWarning($"Skipping duplicate Transaction {tx.Id} in Account {account.Id}");
                            }
                        }
                        account.Transactions = uniqueTransactions;
                    }
                }

                var existingIds = new HashSet<string>(
                    await _context.Accounts.AsNoTracking().Select(a => a.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.Accounts.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new accounts out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Accounts loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading accounts");
                return StatusCode(500, new { message = "Error loading accounts", error = ex.Message });
            }
        }

        [HttpPost("load-gigs")]
        public async Task<IActionResult> LoadGigs([FromBody] Gig[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "Gig");

                var existingIds = new HashSet<string>(
                    await _context.Gigs.AsNoTracking().Select(g => g.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.Gigs.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new gigs out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Gigs loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading gigs");
                return StatusCode(500, new { message = "Error loading gigs", error = ex.Message });
            }
        }

        [HttpPost("load-networks")]
        public async Task<IActionResult> LoadNetworks([FromBody] Network[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "Network");

                var existingIds = new HashSet<string>(
                    await _context.Networks.AsNoTracking().Select(n => n.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.Networks.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new networks out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Networks loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading networks");
                return StatusCode(500, new { message = "Error loading networks", error = ex.Message });
            }
        }

        [HttpPost("load-subnetworks")]
        public async Task<IActionResult> LoadSubnetworks([FromBody] Subnetwork[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "Subnetwork");

                var existingIds = new HashSet<string>(
                    await _context.Subnetworks.AsNoTracking().Select(s => s.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.Subnetworks.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new subnetworks out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Subnetworks loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading subnetworks");
                return StatusCode(500, new { message = "Error loading subnetworks", error = ex.Message });
            }
        }

        [HttpPost("load-hackconfigs")]
        public async Task<IActionResult> LoadHackConfigs([FromBody] HackConfig[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "HackConfig");

                var existingIds = new HashSet<string>(
                    await _context.HackConfig.AsNoTracking().Select(h => h.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.HackConfig.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new hack configs out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Hack configs loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading hack configs");
                return StatusCode(500, new { message = "Error loading hack configs", error = ex.Message });
            }
        }

        [HttpPost("load-programcodes")]
        public async Task<IActionResult> LoadProgramCodes([FromBody] ProgramCodes[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "ProgramCodes");

                var existingIds = new HashSet<string>(
                    await _context.ProgramCodes.AsNoTracking().Select(p => p.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.ProgramCodes.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new program codes out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Program codes loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading program codes");
                return StatusCode(500, new { message = "Error loading program codes", error = ex.Message });
            }
        }

        [HttpPost("load-obscuredcodes")]
        public async Task<IActionResult> LoadObscuredCodes([FromBody] ObscuredCodesMap[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "ObscuredCodesMap");

                var existingIds = new HashSet<string>(
                    await _context.ObscuredCodesMap.AsNoTracking().Select(o => o.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.ObscuredCodesMap.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new obscured codes out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Obscured codes loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading obscured codes");
                return StatusCode(500, new { message = "Error loading obscured codes", error = ex.Message });
            }
        }

        [HttpPost("load-conversations")]
        public async Task<IActionResult> LoadConversations([FromBody] Conversation[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "Conversation");

                var existingIds = new HashSet<string>(
                    await _context.Conversations.AsNoTracking().Select(c => c.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.Conversations.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new conversations out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Conversations loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading conversations");
                return StatusCode(500, new { message = "Error loading conversations", error = ex.Message });
            }
        }

        [HttpPost("load-anonymized")]
        public async Task<IActionResult> LoadAnonymized([FromBody] AnonymizedUser[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "AnonymizedUser");

                var existingIds = new HashSet<string>(
                    await _context.AnonymizedUsers.AsNoTracking().Select(a => a.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.AnonymizedUsers.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new anonymized users out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Anonymized users loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading anonymized users");
                return StatusCode(500, new { message = "Error loading anonymized users", error = ex.Message });
            }
        }

        [HttpPost("load-logs")]
        public async Task<IActionResult> LoadLogs([FromBody] Log[] data)
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                // Preprocess data: handle nulls and duplicates
                var processed = PreprocessData(data,
                    item => item.Id,
                    (item, id) => { item.Id = id; return item; },
                    "Log");

                var existingIds = new HashSet<string>(
                    await _context.Logs.AsNoTracking().Select(l => l.Id).ToListAsync()
                );
                var toAdd = processed.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                if (toAdd.Any())
                {
                    _context.Logs.AddRange(toAdd);
                    await _context.SaveChangesAsync();
                }
                
                _logger.LogInformation($"Loaded {toAdd.Count} new logs out of {data.Length} total (after preprocessing: {processed.Length})");
                return Ok(new { count = toAdd.Count, message = "Logs loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading logs");
                return StatusCode(500, new { message = "Error loading logs", error = ex.Message });
            }
        }

        [HttpPost("clear-all")]
        public async Task<IActionResult> ClearAllData()
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                _context.Auths.RemoveRange(_context.Auths);
                _context.Accounts.RemoveRange(_context.Accounts);
                _context.Networks.RemoveRange(_context.Networks);
                _context.Subnetworks.RemoveRange(_context.Subnetworks);
                _context.HackConfig.RemoveRange(_context.HackConfig);
                _context.ProgramCodes.RemoveRange(_context.ProgramCodes);
                _context.ObscuredCodesMap.RemoveRange(_context.ObscuredCodesMap);
                _context.Logs.RemoveRange(_context.Logs);
                _context.Conversations.RemoveRange(_context.Conversations);
                _context.Messages.RemoveRange(_context.Messages);
                _context.AnonymizedUsers.RemoveRange(_context.AnonymizedUsers);
                _context.Transactions.RemoveRange(_context.Transactions);
                _context.Gigs.RemoveRange(_context.Gigs);
                _context.Users.RemoveRange(_context.Users);
                
                await _context.SaveChangesAsync();
                _logger.LogInformation("All data cleared");
                return Ok(new { message = "All data cleared successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error clearing data");
                return StatusCode(500, new { message = "Error clearing data", error = ex.Message });
            }
        }

        [HttpGet("status")]
        public IActionResult GetStatus()
        {
            if (!CheckBasicAuth()) return Unauthorized();
            
            try
            {
                var status = new
                {
                    auths = _context.Auths.Count(),
                    users = _context.Users.Count(),
                    accounts = _context.Accounts.Count(),
                    gigs = _context.Gigs.Count(),
                    networks = _context.Networks.Count(),
                    subnetworks = _context.Subnetworks.Count(),
                    hackConfigs = _context.HackConfig.Count(),
                    programCodes = _context.ProgramCodes.Count(),
                    obscuredCodes = _context.ObscuredCodesMap.Count(),
                    conversations = _context.Conversations.Count(),
                    messages = _context.Messages.Count(),
                    anonymizedUsers = _context.AnonymizedUsers.Count(),
                    logs = _context.Logs.Count(),
                    transactions = _context.Transactions.Count()
                };

                return Ok(status);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting status");
                return StatusCode(500, new { message = "Error getting status", error = ex.Message });
            }
        }
    }
}
