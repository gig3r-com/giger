using Giger.Models.User;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(UserService userService, LoginService loginService) : AuthController(userService, loginService)
    {
        #region PrivateUser

        [HttpGet("private/all")]
        public async Task<List<UserPrivate>> GetAllPrivateUsers() => await _userService.GetAllPrivateUsersAsync();
            
        [HttpGet("private/byId")]
        public async Task<ActionResult<UserPrivate>> Get(string id)
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
        public async Task<IActionResult> Update(string id, UserPrivate updatedUser)
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
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _userService.GetAsync(id);
            if (book is null)
            {
                return NoContent();
            }

            await _userService.RemoveAsync(id);
            return Ok();
        }

        [HttpGet("favorites")]
        public async Task<ActionResult<string[]>> GetFavorites(string userId)
        {
            if (!IsAuthorized(userId))
            {
                return Unauthorized();
            }
            var user = await _userService.GetAsync(userId);
            if (user is null)
            {
                return NoContent();
            }
            return user.FavoriteUserIds;
        }

        [HttpPut("favorites/add")]
        public async Task<IActionResult> AddFavorite(string userId, string newFavorite)
        {
            if (!IsAuthorized(userId))
            {
                return Unauthorized();
            }
            var user = await _userService.GetAsync(userId);
            if (user is null)
            {
                return NoContent();
            }
            if (user.FavoriteUserIds.Contains(newFavorite))
            {
                return Ok();
            }
            user.FavoriteUserIds = [.. user.FavoriteUserIds, newFavorite];
            await _userService.UpdateAsync(userId, user);
            return Ok();
        }

        [HttpPut("favorites/remove")]
        public async Task<IActionResult> RemoveFavorite(string userId, string oldFavorite)
        {
            if (!IsAuthorized(userId))
            {
                return Unauthorized();
            }
            var user = await _userService.GetAsync(userId);
            if (user is null)
            {
                return NoContent();
            }
            user.FavoriteUserIds = user.FavoriteUserIds.Except([oldFavorite]).ToArray();
            await _userService.UpdateAsync(userId, user);
            return Ok();
        }

        [HttpPut("favorites")]
        public async Task<IActionResult> UpdateFavorites(string userId, string[] newFavorites)
        {
            var user = await _userService.GetAsync(userId);
            if (user is null)
            {
                return NoContent();
            }
            user.FavoriteUserIds = newFavorites;
            await _userService.UpdateAsync(userId, user);
            return Ok();
        }
        #endregion

        #region PublicUser
        [HttpGet("public/all")]
        public async Task<List<UserPublic>> GetAllPublicUsers() => await Task.Run(() => _userService.GetAllPrivateUsersAsync().Result.Cast<UserPublic>().ToList());

        [HttpGet("public/byId")]
        public async Task<ActionResult<UserPublic>> GetPublicById(string id)
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
        public async Task<ActionResult<UserBase>> GetBaseById(string id)
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
        public async Task<ActionResult<string>> GetUserName(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            return user.Name;
        }

        [HttpPatch("{id}/name")]
        public async Task<IActionResult> PatchUserName(string id, string newName)
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
        public async Task<ActionResult<UserRoles[]>> GetUserRoles(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.Roles;
        }

        [HttpPatch("{id}/roles")]
        public async Task<IActionResult> PatchUserRoles(string id, UserRoles[] newRoles)
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