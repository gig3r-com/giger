using Giger.Models.User;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public partial class UserController(UserService userService, LoginService loginService, RecordService recordService)
        : AuthController(userService, loginService)
    {
        protected readonly RecordService _recordService = recordService;

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
        public async Task<IActionResult> Update(User updatedUser)
        {
            if (!IsAuthorized(updatedUser.Id))
            {
                Unauthorized();
            }
            var user = await _userService.GetAsync(updatedUser.Id);
            if (user is null)
            {
                return BadRequest();
            }

            await _userService.UpsertAsync(updatedUser);
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
