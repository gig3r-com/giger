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

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataLoadController : Controller
    {
        private readonly GigerDbContext _context;
        private readonly ILogger<DataLoadController> _logger;

        public DataLoadController(GigerDbContext context, ILogger<DataLoadController> logger)
        {
            _context = context;
            _logger = logger;
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

        [AllowAnonymous]
        [HttpPost("load-auths")]
        public async Task<IActionResult> LoadAuths([FromBody] Auth[] data)
        {
            try
            {
                int added = 0;
                foreach (var item in data)
                {
                    try
                    {
                        var exists = await _context.Auths.AnyAsync(a => a.Id == item.Id);
                        if (!exists)
                        {
                            _context.Auths.Add(item);
                            await _context.SaveChangesAsync();
                            added++;
                        }
                    }
                    catch (DbUpdateException)
                    {
                        // Skip duplicates
                        _context.Entry(item).State = EntityState.Detached;
                    }
                }
                
                _logger.LogInformation($"Loaded {added} new auth records out of {data.Length} total");
                return Ok(new { count = added, message = "Auths loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading auths");
                return StatusCode(500, new { message = "Error loading auths", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-users")]
        public async Task<IActionResult> LoadUsers([FromBody] UserPrivate[] data)
        {
            try
            {
                var existingIds = await _context.Users.Select(u => u.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.Users.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new users out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Users loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading users");
                return StatusCode(500, new { message = "Error loading users", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-accounts")]
        public async Task<IActionResult> LoadAccounts([FromBody] Account[] data)
        {
            try
            {
                var existingIds = await _context.Accounts.Select(a => a.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.Accounts.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new accounts out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Accounts loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading accounts");
                return StatusCode(500, new { message = "Error loading accounts", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-gigs")]
        public async Task<IActionResult> LoadGigs([FromBody] Gig[] data)
        {
            try
            {
                var existingIds = await _context.Gigs.Select(g => g.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.Gigs.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new gigs out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Gigs loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading gigs");
                return StatusCode(500, new { message = "Error loading gigs", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-networks")]
        public async Task<IActionResult> LoadNetworks([FromBody] Network[] data)
        {
            try
            {
                var existingIds = await _context.Networks.Select(n => n.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.Networks.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new networks out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Networks loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading networks");
                return StatusCode(500, new { message = "Error loading networks", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-subnetworks")]
        public async Task<IActionResult> LoadSubnetworks([FromBody] Subnetwork[] data)
        {
            try
            {
                var existingIds = await _context.Subnetworks.Select(s => s.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.Subnetworks.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new subnetworks out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Subnetworks loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading subnetworks");
                return StatusCode(500, new { message = "Error loading subnetworks", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-hackconfigs")]
        public async Task<IActionResult> LoadHackConfigs([FromBody] HackConfig[] data)
        {
            try
            {
                var existingIds = await _context.HackConfig.Select(h => h.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.HackConfig.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new hack configs out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Hack configs loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading hack configs");
                return StatusCode(500, new { message = "Error loading hack configs", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-programcodes")]
        public async Task<IActionResult> LoadProgramCodes([FromBody] ProgramCodes[] data)
        {
            try
            {
                var existingIds = await _context.ProgramCodes.Select(p => p.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.ProgramCodes.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new program codes out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Program codes loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading program codes");
                return StatusCode(500, new { message = "Error loading program codes", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-obscuredcodes")]
        public async Task<IActionResult> LoadObscuredCodes([FromBody] ObscuredCodesMap[] data)
        {
            try
            {
                var existingIds = await _context.ObscuredCodesMap.Select(o => o.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.ObscuredCodesMap.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new obscured codes out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Obscured codes loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading obscured codes");
                return StatusCode(500, new { message = "Error loading obscured codes", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-conversations")]
        public async Task<IActionResult> LoadConversations([FromBody] Conversation[] data)
        {
            try
            {
                var existingIds = await _context.Conversations.Select(c => c.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.Conversations.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new conversations out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Conversations loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading conversations");
                return StatusCode(500, new { message = "Error loading conversations", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-anonymized")]
        public async Task<IActionResult> LoadAnonymized([FromBody] AnonymizedUser[] data)
        {
            try
            {
                var existingIds = await _context.AnonymizedUsers.Select(a => a.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.AnonymizedUsers.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new anonymized users out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Anonymized users loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading anonymized users");
                return StatusCode(500, new { message = "Error loading anonymized users", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("load-logs")]
        public async Task<IActionResult> LoadLogs([FromBody] Log[] data)
        {
            try
            {
                var existingIds = await _context.Logs.Select(l => l.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.Logs.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new logs out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Logs loaded successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading logs");
                return StatusCode(500, new { message = "Error loading logs", error = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("clear-all")]
        public async Task<IActionResult> ClearAllData()
        {
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

        [AllowAnonymous]
        [HttpGet("status")]
        public IActionResult GetStatus()
        {
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
