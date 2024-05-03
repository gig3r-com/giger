using Giger.Models.EventModels;
using Giger.Models.User.Records;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    partial class UserController
    {
		#region UserRecords

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
			var privateRecords = user.PrivateRecords;
			if (!IsGodUser())
			{
				FilterObscurableField(privateRecords);
			}

			return privateRecords;
		}

		[HttpPut("{id}/privateRecords")]
		public async Task<IActionResult> UpdatePrivateRecords(string id, PrivateRecord[] privateRecords)
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
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpPatch("{id}/privateRecords")]
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
				user.PrivateRecords = [.. user.PrivateRecords, privateRecord];
				await _userService.UpdateAsync(user);
				return Ok();
			}
			return BadRequest("Record already exists");
		}

		[HttpGet("{id}/relations")]
		public async Task<ActionResult<Relation[]>> GetRelations(string id)
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
			var relations = user.Relations;
			if (!IsGodUser())
			{
				FilterObscurableField(relations);
			}

			return relations;
		}

		[HttpPut("{id}/relations")]
		public async Task<IActionResult> UpdateRelations(string id, Relation[] relations)
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
			user.Relations = relations;
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpPatch("{id}/relations")]
		public async Task<IActionResult> AddRelation(string id, Relation relation)
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
			if (!user.Relations.Any(pr => pr.Id == relation.Id))
			{
				user.Relations = [.. user.Relations, relation];
				await _userService.UpdateAsync(user);
				return Ok();
			}
			return BadRequest("Record already exists");
		}

		[HttpGet("{id}/goals")]
		public async Task<ActionResult<Goal[]>> GetGoals(string id)
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
			var goals = user.Goals;
			if (!IsGodUser())
			{
				FilterObscurableField(goals);
			}

			return goals;
		}

		[HttpPut("{id}/goals")]
		public async Task<IActionResult> UpdateGoals(string id, Goal[] goals)
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
			user.Goals = goals;
			await _userService.UpdateAsync(user);
			return Ok();
		}

		[HttpPatch("{id}/goals")]
		public async Task<IActionResult> AddGoal(string id, Goal goal)
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
			if (!user.Goals.Any(pr => pr.Id == goal.Id))
			{
				user.Goals = [.. user.Goals, goal];
				await _userService.UpdateAsync(user);
				return Ok();
			}
			return BadRequest("Record already exists");
		}


        [HttpGet("{id}/metas")]
        public async Task<ActionResult<Meta[]>> GetMetas(string id)
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
            var metas = user.Meta;
            if (!IsGodUser())
            {
                FilterObscurableField(metas);
            }

            return metas;
        }

        [HttpPut("{id}/metas")]
        public async Task<IActionResult> UpdateMetas(string id, Meta[] metas)
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
            user.Meta = metas;
            await _userService.UpdateAsync(user);
            return Ok();
        }

        [HttpPatch("{id}/metas")]
        public async Task<IActionResult> AddMeta(string id, Meta meta)
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
            if (!user.Meta.Any(pr => pr.Id == meta.Id))
            {
                user.Meta = [.. user.Meta, meta];
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record already exists");
        }

        [HttpGet("{id}/criminalEvents")]
        public async Task<ActionResult<CriminalEvent[]>> GetCriminalEvents(string id)
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
            var criminalEvents = user.CriminalEvents;
            if (!IsGodUser())
            {
                FilterObscurableField(criminalEvents);
            }

            return criminalEvents;
        }

        [HttpPut("{id}/criminalEvents")]
        public async Task<IActionResult> UpdateCriminalEvents(string id, CriminalEvent[] criminalEvents)
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
            user.CriminalEvents = criminalEvents;
            await _userService.UpdateAsync(user);
            return Ok();
        }

        [HttpPatch("{id}/criminalEvents")]
        public async Task<IActionResult> AddCriminalEvent(string id, CriminalEvent criminalEvent)
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
            if (!user.CriminalEvents.Any(pr => pr.Id == criminalEvent.Id))
            {
                user.CriminalEvents = [.. user.CriminalEvents, criminalEvent];
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record already exists");
        }

        [HttpGet("{id}/medicalEvents")]
        public async Task<ActionResult<MedicalEvent[]>> GetMedicalEvents(string id)
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
            var medicalEvents = user.MedicalEvents;
            if (!IsGodUser())
            {
                FilterObscurableField(medicalEvents);
            }

            return medicalEvents;
        }

        [HttpPut("{id}/medicalEvents")]
        public async Task<IActionResult> UpdateMedicalEvents(string id, MedicalEvent[] medicalEvents)
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
            user.MedicalEvents = medicalEvents;
            await _userService.UpdateAsync(user);
            return Ok();
        }

        [HttpPatch("{id}/medicalEvents")]
        public async Task<IActionResult> AddMedicalEvent(string id, MedicalEvent medicalEvent)
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
            if (!user.MedicalEvents.Any(pr => pr.Id == medicalEvent.Id))
            {
                user.MedicalEvents = [.. user.MedicalEvents, medicalEvent];
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record already exists");
        }

        #endregion
    }
}
