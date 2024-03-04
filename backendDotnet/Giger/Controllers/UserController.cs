using Giger.Models.User;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService) => _userService = userService;

        #region PrivateUser

        [HttpGet("private/all")]
        public async Task<List<UserPrivate>> GetAllPrivateUsers() => await _userService.GetAllPrivateUsersAsync();
            
        [HttpGet("private/byId")]
        public async Task<ActionResult<UserPrivate>> Get(int id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("private/byName")]
        public async Task<ActionResult<UserPrivate>> Get(string firstName, string surname)
        {
            var user = await _userService.GetByFirstNameAsync(firstName, surname);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost()]
        public async Task<IActionResult> Post(UserPrivate newUser)
        {
            await _userService.CreateAsync(newUser);
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }


        [HttpPut("byId")]
        public async Task<IActionResult> Update(int id, UserPrivate updatedUser)
        {
            var book = await _userService.GetAsync(id);
            if (book is null)
            {
                return NoContent();
            }

            updatedUser.Id = book.Id;
            await _userService.UpsertAsync(id, updatedUser);
            return Ok();
        }

        [HttpDelete("byId")]
        public async Task<IActionResult> Delete(int id)
        {
            var book = await _userService.GetAsync(id);
            if (book is null)
            {
                return NoContent();
            }

            await _userService.RemoveAsync(id);
            return Ok();
        }
        #endregion

        #region PublicUser
        [HttpGet("public/all")]
        public async Task<List<UserPublic>> GetAllPublicUsers() => await Task.Run(() => _userService.GetAllPrivateUsersAsync().Result.Cast<UserPublic>().ToList());

        [HttpGet("public/byId")]
        public async Task<ActionResult<UserPublic>> GetPublicById(int id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("public/byName")]
        public async Task<ActionResult<UserPublic>> GetPublicByName(string firstName, string surname)
        {
            var user = await _userService.GetByFirstNameAsync(firstName, surname);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }
        #endregion

        #region BaseUser
        [HttpGet("general/all")]
        public async Task<List<UserBase>> GetAllGeneralUsers() => await Task.Run(() => _userService.GetAllPrivateUsersAsync().Result.Cast<UserBase>().ToList());

        [HttpGet("general/byId")]
        public async Task<ActionResult<UserBase>> GetBaseById(int id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("general/byName")]
        public async Task<ActionResult<UserBase>> GetBaseByName(string firstName, string surname)
        {
            var user = await _userService.GetByFirstNameAsync(firstName, surname);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }
        #endregion

        #region SingleProperties
        [HttpGet("{id}/name")]
        public async Task<ActionResult<string>> GetUserName(int id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            return user.Name;
        }

        [HttpPatch("{id}/name")]
        public async Task<IActionResult> PatchUserName(int id, string newName)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.Name = newName;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpGet("{id}/roles")]
        public async Task<ActionResult<UserRoles[]>> GetUserRoles(int id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.Roles;
        }

        [HttpPatch("{id}/roles")]
        public async Task<IActionResult> PatchUserRoles(int id, UserRoles[] newRoles)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.Roles = newRoles;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }
        #endregion
    }
}