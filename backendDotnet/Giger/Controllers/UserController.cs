﻿using Giger.Models.Obscured;
using Giger.Models.User;
using Giger.Models.User.Records;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public partial class UserController(UserService userService, LoginService loginService) : AuthController(userService, loginService)
    {
        #region Simple User

        [HttpGet("simple/byId")]
        public async Task<ActionResult<UserSimple>> GetSimpleById(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Forbid();
            }
            
            user = FilterOutGodUser(user);
            if (user is null)
            {
                return NoContent();
            }
            return new UserSimple(user);
        }

        [HttpGet("simple/hashes/byId")]
        public async Task<ActionResult<RecordsHashes>> GetHashesById(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Forbid();
            }

            user = FilterOutGodUser(user);
            if (user is null)
            {
                return NoContent();
            }
            return new RecordsHashes(user);
        }

        [HttpGet("simple/byUsername")]
        public async Task<ActionResult<UserSimple>> GetSimpleByUsername(string username)
        {
            var user = await _userService.GetAsync(username);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Forbid();
            }

            user = FilterOutGodUser(user);
            return new UserSimple(user);
        }

        [HttpGet("simple/hashes/byUsername")]
        public async Task<ActionResult<RecordsHashes>> GetHashesByUsername(string username)
        {
            var user = await _userService.GetAsync(username);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Forbid();
            }

            user = FilterOutGodUser(user);
            return new RecordsHashes(user);
        }

        #endregion

        #region PrivateUser

        [HttpGet("private/all")]
        public async Task<List<UserPrivate>> GetAllPrivateUsers()
        {
            var allUsers = await _userService.GetAllPrivateUsersAsync();
            return FilterOutAllGodUsers(allUsers);
        }

        [HttpGet("private/byId")]
        public async Task<ActionResult<UserPrivate>> Get(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Forbid();
            }

            var u = user as UserSimple;

            FilterObscurableData(user);
            return FilterOutGodUser(user);
        }

        [HttpGet("private/byUsername")]
        public async Task<ActionResult<UserPrivate>> GetByUserName(string userName)
        {
            var user = await _userService.GetByUserNameAsync(userName);
            if (user is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(user.Id))
            {
                return Forbid();
            }

            FilterObscurableData(user);
            return FilterOutGodUser(user);
        }

        [HttpPost()]
        public async Task<IActionResult> Post(UserPrivate newUser)
        {
            if (!IsGodUser())
            {
                Forbid();
            }

            await _userService.CreateAsync(newUser);
            return CreatedAtAction(nameof(Post), new { id = newUser.Id }, newUser);
        }

        [HttpPut()]
        public async Task<IActionResult> Update(UserPrivate updatedUser)
        {
            if (!IsAuthorized(updatedUser.Id))
            {
                Forbid();
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
                Forbid();
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

        [HttpGet("public/byUsername")]
        public async Task<ActionResult<UserPublic>> GetPublicByUsername(string username)
        {
            var user = await _userService.GetByUserNameAsync(username);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }
        #endregion

        private void FilterObscurableData(UserPrivate user)
        {
            if (IsGodUser())
            {
                return;
            }

            FilterObscurableField(user.PrivateRecords);
            FilterObscurableField(user.MedicalEvents);
            FilterObscurableField(user.CriminalEvents);
            FilterObscurableField(user.Relations);
            FilterObscurableField(user.Meta);
            FilterObscurableField(user.Goals);
        }

        private void FilterObscurableField(IEnumerable<ObscurableInfo> obscurableFields)
        {
            foreach (var element in obscurableFields)
            {
                if (!element.IsRevealed)
                {
                    element.Obscure();
                }
            }
        }

        private List<UserPrivate> FilterOutAllGodUsers(List<UserPrivate> users)
        {
            if (IsGodUser())
            {
                return users;
            }    
            return users.Where(u => !u.Roles.Contains(UserRoles.GOD)).ToList();
        }

        private UserPrivate FilterOutGodUser(UserPrivate user)
        {
            if (!user.Roles.Contains(UserRoles.GOD))
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