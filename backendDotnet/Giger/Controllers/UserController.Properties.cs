using Giger.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    partial class UserController
    {
		#region SingleProperties

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
			return user.FavoriteUsers.Select(f => f.FavoriteUserHandle).ToArray();
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
			if (user.FavoriteUsers.Any(f => f.FavoriteUserHandle == newFavorite))
			{
				return Ok();
			}
			user.FavoriteUsers.Add(new UserFavoriteUser { UserId = userId, FavoriteUserHandle = newFavorite });
			await _userService.UpdateAsync(user);
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
			var fav = user.FavoriteUsers.FirstOrDefault(f => f.FavoriteUserHandle == oldFavorite);
			if (fav != null)
			{
				user.FavoriteUsers.Remove(fav);
			}
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpGet("{id}/surname")]
		public async Task<ActionResult<string>> GetUserSurname(string id)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NoContent();
			}
			return user.Surname;
		}

		[HttpPatch("{id}/surname")]
		public async Task<IActionResult> PatchUserSurname(string id, string newSurname)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NoContent();
			}
			user.Surname = newSurname;
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpGet("{id}/name")]
		public async Task<ActionResult<string>> GetUserName(string id)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
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
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NoContent();
			}
			user.Name = newName;
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpGet("{id}/hackerName")]
		public async Task<ActionResult<string>> GetHackerName(string id)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NoContent();
			}
			return user.HackerName;
		}

		[HttpPatch("{id}/hackerName")]
		public async Task<IActionResult> PatchHackerName(string id, string newName)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			var auth = await _loginService.GetByUserNameAsync(user.Handle);
			if (user is null || auth is null)
			{
				return NoContent();
			}
			user.HackerName = newName;
			auth.HackerName = newName;
			await _userService.UpdateAsync(user);
			await _loginService.UpdateAsync(auth);
			return Ok();
		}

		[HttpGet("{id}/roles")]
		public async Task<ActionResult<string[]>> GetUserRoles(string id)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NotFound();
			}
			return user.Roles;
		}

		[HttpPatch("{id}/roles")]
		public async Task<IActionResult> PatchUserRoles(string id, string[] newRoles)
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
			user.Roles = newRoles;
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpGet("{id}/exploits")]
		public async Task<ActionResult<string[]>> GetExploits(string id)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NotFound();
			}
			return user.Exploits;
		}

		[HttpPut("{id}/exploits")]
		public async Task<IActionResult> PutExploits(string id, string[] newExploits)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NoContent();
			}
			user.Exploits = newExploits;
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpPatch("{id}/exploits")]
		public async Task<IActionResult> PatchExploits(string id, string newExploit)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NoContent();
			}

			if (user.Exploits.Contains(newExploit))
			{
				return Ok();
			}

			user.Exploits = [.. user.Exploits, newExploit];
			await _userService.UpdateAsync(user);
			return Ok();
		}

        [HttpGet("{id}/factionRank")]
        public async Task<ActionResult<string>> GetFactionRank(string id)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.FactionRankActual;
        }

        [HttpPatch("{id}/factionRank")]
        public async Task<IActionResult> PatchFactionRank(string id, string newRank)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NoContent();
            }
            user.FactionRankActual = newRank;
            await _userService.UpdateAsync(user);
            return Ok();
        }

        [HttpGet("{id}/faction")]
		public async Task<ActionResult<string>> GetFaction(string id)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NotFound();
			}
			return user.Faction;
		}

		[HttpPatch("{id}/faction")]
		public async Task<IActionResult> PatchFaction(string id, string newFaction)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NoContent();
			}
			user.Faction = newFaction;
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpPatch("{id}/active")]
		public async Task<IActionResult> PatchIsActive(string id, bool isActive)
		{
			if (!IsGodUser())
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NotFound();
			}
			user.Active = isActive;
			await _userService.UpdateAsync(user);
			return Ok();
		}

		#endregion
	}
}
