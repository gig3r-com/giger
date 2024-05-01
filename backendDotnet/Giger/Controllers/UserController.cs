﻿using Giger.Models.EventModels;
using Giger.Models.Obscured;
using Giger.Models.User;
using Giger.Models.User.Records;
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

        [HttpGet("private/byName")]
        public async Task<ActionResult<UserPrivate>> Get(string firstName, string surname)
        {
            
            var user = await _userService.GetByFirstNameAsync(firstName, surname);
            if (user is null)
            {
                return NotFound();
            }

            if (IsAuthorized(user.Id))
            {
                return Forbid();
            }

            FilterObscurableData(user);
            return FilterOutGodUser(user);
        }

        [HttpPost()]
        public async Task<IActionResult> Post(UserPrivate newUser)
        {
            await _userService.CreateAsync(newUser);
            return CreatedAtAction(nameof(Post), new { id = newUser.Id }, newUser);
        }

        [Obsolete("Should have endpoint for each change request")]
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

            await _userService.UpsertAsync(updatedUser.Id, updatedUser);
            return Ok();
        }

        [HttpDelete("byId")]
        public async Task<IActionResult> Delete(string id)
        {
            if (!IsAuthorized(id))
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

        [HttpGet("favorites")]
        public async Task<ActionResult<string[]>> GetFavorites(string userId)
        {
            if (!IsAuthorized(userId))
            {
                return Forbid();
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
                return Forbid();
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
                return Forbid();
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

        #region SingleProperties

        [HttpGet("{id}/name")]
        public async Task<ActionResult<string>> GetUserName(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

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
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.Name = newName;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpGet("{id}/hackerName")]
        public async Task<ActionResult<string>> GetHackerName(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            return user.Name;
        }

        [HttpPatch("{id}/hackerName")]
        public async Task<IActionResult> PatchHackerName(string id, string newName)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.HackerName = newName;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpGet("{id}/roles")]
        public async Task<ActionResult<UserRoles[]>> GetUserRoles(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

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
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.Roles = newRoles;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpGet("{id}/exploits")]
        public async Task<ActionResult<string[]>> GetExploits(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.Exploits;
        }

        [HttpPatch("{id}/exploits")]
        public async Task<IActionResult> PatchExploits(string id, string[] newExploits)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.Exploits = newExploits;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpGet("{id}/mindHack")]
        public async Task<ActionResult<MindHacks>> GetMindHacks(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.MindHack;
        }

        [HttpPatch("{id}/mindHack")]
        public async Task<IActionResult> PatchMindHacks(string id, MindHacks newMindHack)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.MindHack = newMindHack;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpGet("{id}/mindHack/enabledUsers")]
        public async Task<ActionResult<List<string>>> GetMindHackEnabledUsers(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.MindHackEnabledFor.ToList();
        }

        [HttpPatch("{id}/mindHack/enabledUsers")]
        public async Task<IActionResult> PatchMindHackEnabledUsers(string id, string[] enabledUsers)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.MindHackEnabledFor = enabledUsers;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpGet("{id}/professionPublic")]
        public async Task<ActionResult<string>> GetProfessionPublic(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.ProfessionPublic;
        }

        [HttpPatch("{id}/professionPublic")]
        public async Task<IActionResult> PatchProfessionPublic(string id, string newProfession)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.ProfessionPublic = newProfession;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpGet("{id}/userTypes")]
        public async Task<ActionResult<UserTypes>> GetUserTypes(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.TypePublic;
        }

        [HttpPatch("{id}/userTypes")]
        public async Task<IActionResult> PatchUserTypes(string id, UserTypes userTypes)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.TypePublic = userTypes;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpGet("{id}/privateRecords")]
        public async Task<ActionResult<PrivateRecord[]>> GetPrivateRecords(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.PrivateRecords;
        }

        [Obsolete("Use the endpoint for each change request")]
        [HttpPatch("{id}/privateRecords")]
        public async Task<IActionResult> PatchPrivateRecords(string id, PrivateRecord[] privateRecords)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.PrivateRecords = privateRecords;
            await _userService.UpdateAsync(id, user);
            return Ok();
        }

        [HttpPatch("{id}/privateRecord")]
        public async Task<IActionResult> AddPrivateRecord(string id, PrivateRecord privateRecord)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            if (!user.PrivateRecords.Any(pr => pr.Id == privateRecord.Id))
            {
                user.PrivateRecords = [..user.PrivateRecords, privateRecord];
                await _userService.UpdateAsync(id, user);
                return Ok();
            }
            return BadRequest("Record already exists");
        }

        [HttpGet("{id}/hasPlatinumPass")]
        public async Task<ActionResult<bool>> GetHasPlatinumPass(string id)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.HasPlatinumPass;
        }

        [HttpPatch("{id}/hasPlatinumPass")]
        public async Task<IActionResult> PatchHasPlatinumPass(string id, bool enabled)
        {
            if (!IsAuthorized(id))
            {
                Forbid();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            user.HasPlatinumPass = enabled;
            await _userService.UpdateAsync(id, user);
            return Ok();
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