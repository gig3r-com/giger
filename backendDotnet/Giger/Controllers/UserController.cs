using System.Text.Json;
using Giger.DTOs;
using Giger.Models.User;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public partial class UserController(UserService userService, LoginService loginService, RecordService recordService, GigerDbContext dbContext)
        : AuthController(userService, loginService)
    {
        protected readonly RecordService _recordService = recordService;
        private readonly GigerDbContext _dbContext = dbContext;

        [HttpGet("all")]
        public async Task<List<string>> GetAllUserNames()
        {
            var allUsers = await _userService.GetAllUsersAsync();
            allUsers = FilterOutAllGodUsers(allUsers);
            return allUsers.Select(u => u.Handle).ToList();
        }

        #region User

        [HttpGet("all/full")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            var allUsers = await _userService.GetAllUsersAsync();
            return FilterOutAllGodUsers(allUsers);
        }

        [HttpGet("byId")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Unauthorized();
            }
            user = FilterOutGodUser(user);
            if (user is null)
            {
                return NoContent();
            }
            return user;
        }

        [HttpGet("simple/byId")]
        public async Task<ActionResult<UserDTO>> GetSimpleById(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Unauthorized();
            }
            user = FilterOutGodUser(user);
            if (user is null)
            {
                return NoContent();
            }
            return UserDTO.FromModel(user);
        }

        [HttpGet("byUsername")]
        public async Task<ActionResult<User>> GetByUserName(string userName)
        {
            var user = await _userService.GetByUserNameAsync(userName);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Unauthorized();
            }

            return FilterOutGodUser(user);
        }

        [HttpGet("simple/byUsername")]
        public async Task<ActionResult<UserDTO>> GetSimpleByUserName(string userName)
        {
            var user = await _userService.GetByUserNameAsync(userName);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Unauthorized();
            }

            return UserDTO.FromModel(FilterOutGodUser(user));
        }

        [HttpGet("private/byId")]
        public async Task<ActionResult<UserDTO>> GetPrivateById(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Unauthorized();
            }
            user = FilterOutGodUser(user);
            if (user is null)
            {
                return NoContent();
            }
            return UserDTO.FromModel(user);
        }

        [HttpGet("public/byId")]
        public async Task<ActionResult<UserDTO>> GetPublicById(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            user = FilterOutGodUser(user);
            if (user is null)
            {
                return NoContent();
            }
            return UserDTO.FromModel(user);
        }

        [HttpGet("private/byName/{name}")]
        public async Task<ActionResult<UserDTO>> GetPrivateByName(string name)
        {
            var user = await _userService.GetByUserNameAsync(name);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Unauthorized();
            }
            user = FilterOutGodUser(user);
            if (user is null)
            {
                return NoContent();
            }
            return UserDTO.FromModel(user);
        }

        [HttpGet("public/byName/{name}")]
        public async Task<ActionResult<UserDTO>> GetPublicByName(string name)
        {
            var user = await _userService.GetByUserNameAsync(name);
            if (user is null)
            {
                return NotFound();
            }
            user = FilterOutGodUser(user);
            if (user is null)
            {
                return NoContent();
            }
            return UserDTO.FromModel(user);
        }

        [HttpGet("public/all")]
        public async Task<List<UserDTO>> GetAllPublicUsers()
        {
            var allUsers = await _userService.GetAllUsersAsync();
            var filteredUsers = FilterOutAllGodUsers(allUsers);
            return filteredUsers.Select(UserDTO.FromModel).ToList();
        }

        [HttpPost()]
        public async Task<IActionResult> Post(User newUser)
        {
            if (!IsGodUser())
            {
                Unauthorized();
            }

            await _userService.CreateAsync(newUser);
            return CreatedAtAction(nameof(Post), new { id = newUser.Id }, newUser);
        }

        [HttpPut()]
        public async Task<IActionResult> Update([FromBody] JsonElement body)
        {
            if (!body.TryGetProperty("id", out var idProp))
            {
                return BadRequest("Missing id");
            }
            var id = idProp.GetString();

            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return BadRequest();
            }

            // Map DTO field names (from frontend) back to User model properties
            foreach (var prop in body.EnumerateObject())
            {
                var val = prop.Value;
                if (val.ValueKind == JsonValueKind.Null) continue;

                switch (prop.Name)
                {
                    case "handle": user.Handle = val.GetString() ?? user.Handle; break;
                    case "name": user.Name = val.GetString(); break;
                    case "surname": user.Surname = val.GetString() ?? user.Surname; break;
                    case "summary": user.Summary = val.GetString(); break;
                    case "active": user.Active = val.GetBoolean(); break;
                    case "faction": user.Faction = val.GetString(); break;
                    case "factionRankPublic": user.FactionRankPublic = val.GetString(); break;
                    case "factionRankActual": user.FactionRankActual = val.GetString(); break;
                    case "typePublic": user.SpeciesPublic = val.GetString(); break;
                    case "typeActual": user.SpeciesActual = val.GetString(); break;
                    case "vibe": user.Vibe = val.GetString(); break;
                    case "vibeLevel": user.VibeLevel = val.GetInt32(); break;
                    case "vibeEngagement": user.VibeEngagement = val.GetString(); break;
                    case "vibeFunction": user.VibeFunction = val.GetString(); break;
                    case "vibeOpinions": user.VibeOpinions = val.GetString(); break;
                    case "affiliation": user.Affiliation = val.GetString(); break;
                    case "profession": user.Profession = val.GetString(); break;
                    case "wealthLevel": user.Wealth = val.GetString(); break;
                    case "highSecurity": user.HighSecurity = val.GetBoolean(); break;
                    case "hasPlatinumPass": user.HasPlatinumPass = val.GetBoolean(); break;
                    case "insuredAmount": user.InsuredAmount = val.GetInt32(); break;
                    case "networkName": user.Network = val.GetString(); break;
                    case "networkAdminName": user.NetworkAdmin = val.GetString(); break;
                    case "subnetworkName": user.Subnetwork = val.GetString(); break;
                    case "cyberwareLevel":
                        if (val.ValueKind == JsonValueKind.Object && val.TryGetProperty("stat", out var cwStat))
                            user.CyberwareLevel = cwStat.GetInt32();
                        else if (val.ValueKind == JsonValueKind.Number)
                            user.CyberwareLevel = val.GetInt32();
                        break;
                    case "combatSkill":
                        if (val.ValueKind == JsonValueKind.Object && val.TryGetProperty("stat", out var csStat))
                            user.CombatSkill = csStat.GetInt32();
                        else if (val.ValueKind == JsonValueKind.Number)
                            user.CombatSkill = val.GetInt32();
                        break;
                    case "hackingSkills":
                        if (val.ValueKind == JsonValueKind.Object && val.TryGetProperty("stat", out var hsStat))
                            user.HackerSkill = hsStat.GetInt32();
                        else if (val.ValueKind == JsonValueKind.Number)
                            user.HackerSkill = val.GetInt32();
                        break;
                    case "confrontationistVsAgreeable":
                        if (val.ValueKind == JsonValueKind.Object && val.TryGetProperty("stat", out var caStat))
                            user.ConfrontationistVsAgreeable = caStat.GetInt32();
                        else if (val.ValueKind == JsonValueKind.Number)
                            user.ConfrontationistVsAgreeable = val.GetInt32();
                        break;
                    case "cowardVsBrave":
                        if (val.ValueKind == JsonValueKind.Object && val.TryGetProperty("stat", out var cbStat))
                            user.CowardVsBrave = cbStat.GetInt32();
                        else if (val.ValueKind == JsonValueKind.Number)
                            user.CowardVsBrave = val.GetInt32();
                        break;
                    case "talkativeVsSilent":
                        if (val.ValueKind == JsonValueKind.Object && val.TryGetProperty("stat", out var tsStat))
                            user.TalkativeVsSilent = tsStat.GetInt32();
                        else if (val.ValueKind == JsonValueKind.Number)
                            user.TalkativeVsSilent = val.GetInt32();
                        break;
                    case "thinkerVsDoer":
                        if (val.ValueKind == JsonValueKind.Object && val.TryGetProperty("stat", out var tdStat))
                            user.ThinkerVsDoer = tdStat.GetInt32();
                        else if (val.ValueKind == JsonValueKind.Number)
                            user.ThinkerVsDoer = val.GetInt32();
                        break;
                    case "hackerName": user.HackerName = val.GetString(); break;
                    case "personalIce": user.PersonalIce = val.GetInt32(); break;
                    case "mainAccount": user.MainAccount = val.GetString(); break;
                    case "epsilonNotes": user.EpsilonNotes = val.GetString(); break;
                    case "epsilonBankingNotes": user.EpsilonBankingNotes = val.GetString(); break;
                    case "epsilonConversationNotes": user.EpsilonConversationNotes = val.GetString(); break;
                    case "epsilonPlots": user.EpsilonPlots = val.GetString(); break;
                }
            }

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("byId")]
        public async Task<IActionResult> Delete(string id)
        {
            if (!IsGodUser())
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }

            await _userService.RemoveAsync(id);
            return Ok();
        }

        #endregion

        private List<User> FilterOutAllGodUsers(List<User> users)
        {
            if (IsGodUser())
            {
                return users;
            }
            return users.Where(u => !u.Roles.Contains("GOD")).ToList();
        }

        private User FilterOutGodUser(User user)
        {
            if (!user.Roles.Contains("GOD"))
            {
                return user;
            }
            if (IsGodUser())
            {
                return user;
            }
            return null;
        }
    }
}
