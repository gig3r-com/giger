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
			await _userService.UpdateAsync(user);
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
			await _userService.UpdateAsync(user);
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
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpGet("{id}/surname")]
		public async Task<ActionResult<string>> GetUserSurname(string id)
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
			return user.Surname;
		}

		[HttpPatch("{id}/surname")]
		public async Task<IActionResult> PatchUserSurname(string id, string newSurname)
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
			user.Surname = newSurname;
			await _userService.UpdateAsync(user);
			return Ok();
		}

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
			await _userService.UpdateAsync(user);
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
			return user.HackerName;
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
			await _userService.UpdateAsync(user);
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
			if (!IsGodUser())
			{
				Forbid();
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
				Forbid();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NotFound();
			}
			return user.Exploits;
		}

		[HttpPut("{id}/exploits")]
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
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpPatch("{id}/exploits")]
		public async Task<IActionResult> PatchExploits(string id, string newExploit)
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

			if (user.Exploits.Contains(newExploit))
			{
				return Ok();
			}

			user.Exploits = [.. user.Exploits, newExploit];
			await _userService.UpdateAsync(user);
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
			await _userService.UpdateAsync(user);
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

		[HttpPut("{id}/mindHack/enabledUsers")]
		public async Task<IActionResult> PatchMindHackEnabledUsers(string id, string[] enabledUsers)
		{
			if (!IsAuthorized())
			{
				Forbid();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NoContent();
			}
			user.MindHackEnabledFor = enabledUsers;
			await _userService.UpdateAsync(user);
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
			await _userService.UpdateAsync(user);
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
			await _userService.UpdateAsync(user);
			return Ok();
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
			if (!IsGodUser())
			{
				Forbid();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
				return NotFound();
			}
			user.HasPlatinumPass = enabled;
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpPatch("{id}/active")]
		public async Task<IActionResult> PatchIsActive(string id, bool isActive)
		{
			if (!IsGodUser())
			{
				Forbid();
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
