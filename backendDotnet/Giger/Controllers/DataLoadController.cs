using Giger.Data;
using Giger.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
                var existingIds = await _context.Auths.Select(a => a.Id).ToListAsync();
                var toAdd = data.Where(item => !existingIds.Contains(item.Id)).ToList();
                
                _context.Auths.AddRange(toAdd);
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} new auth records out of {data.Length} total");
                return Ok(new { count = toAdd.Count, message = "Auths loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.Users.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.Users.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} users");
                return Ok(new { count = count, message = "Users loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.Accounts.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.Accounts.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} accounts");
                return Ok(new { count = count, message = "Accounts loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.Gigs.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.Gigs.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} gigs");
                return Ok(new { count = count, message = "Gigs loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.Networks.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.Networks.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} networks");
                return Ok(new { count = count, message = "Networks loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.Subnetworks.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.Subnetworks.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} subnetworks");
                return Ok(new { count = count, message = "Subnetworks loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.HackConfig.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.HackConfig.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} hack configs");
                return Ok(new { count = count, message = "Hack configs loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.ProgramCodes.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.ProgramCodes.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} program codes");
                return Ok(new { count = count, message = "Program codes loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.ObscuredCodesMap.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.ObscuredCodesMap.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} obscured codes");
                return Ok(new { count = count, message = "Obscured codes loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.Conversations.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.Conversations.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} conversations");
                return Ok(new { count = count, message = "Conversations loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.AnonymizedUsers.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.AnonymizedUsers.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} anonymized users");
                return Ok(new { count = count, message = "Anonymized users loaded successfully" });
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
                foreach (var item in data)
                {
                    var existing = await _context.Logs.FindAsync(item.Id);
                    if (existing == null)
                    {
                        _context.Logs.Add(item);
                    }
                }
                var count = await _context.SaveChangesAsync();
                _logger.LogInformation($"Loaded {count} logs");
                return Ok(new { count = count, message = "Logs loaded successfully" });
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
