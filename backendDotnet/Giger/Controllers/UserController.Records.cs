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
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
                return NotFound(Messages.USER_NOT_FOUND);
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
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
                return NotFound(Messages.USER_NOT_FOUND);
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
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
                return NotFound(Messages.USER_NOT_FOUND);
            }
			if (!user.PrivateRecords.Any(pr => pr.Id == privateRecord.Id))
			{
				user.PrivateRecords = [.. user.PrivateRecords, privateRecord];
				await _userService.UpdateAsync(user);
				return Ok();
			}
			return BadRequest("Record already exists");
		}

        [HttpDelete("{id}/privateRecords/{recordId}")]
        public async Task<IActionResult> DeletePrivateRecord(string id, string recordId)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }
            if (user.PrivateRecords.Any(pr => pr.Id == recordId))
            {
                user.PrivateRecords= user.PrivateRecords.Where(pr => pr.Id != recordId).ToArray();
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record does not exist");
        }

		[HttpGet("{id}/relations")]
		public async Task<ActionResult<Relation[]>> GetRelations(string id)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
                return NotFound(Messages.USER_NOT_FOUND);
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
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
                return NotFound(Messages.USER_NOT_FOUND);
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
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
                return NotFound(Messages.USER_NOT_FOUND);
            }
			if (!user.Relations.Any(pr => pr.Id == relation.Id))
			{
				user.Relations = [.. user.Relations, relation];
				await _userService.UpdateAsync(user);
				return Ok();
			}
			return BadRequest("Record already exists");
		}

        [HttpDelete("{id}/relations/{relationId}")]
        public async Task<IActionResult> DeleteRelation(string id, string relationId)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }
            if (user.Relations.Any(pr => pr.Id == relationId))
            {
                user.Relations= user.Relations.Where(pr => pr.Id != relationId).ToArray();
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record does not exist");
        }

		[HttpGet("{id}/goals")]
		public async Task<ActionResult<Goal[]>> GetGoals(string id)
		{
			if (!IsAuthorized(id))
			{
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
                return NotFound(Messages.USER_NOT_FOUND);
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
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
                return NotFound(Messages.USER_NOT_FOUND);
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
				Unauthorized();
			}

			var user = await _userService.GetAsync(id);
			if (user is null)
			{
                return NotFound(Messages.USER_NOT_FOUND);
            }
			if (!user.Goals.Any(pr => pr.Id == goal.Id))
			{
				user.Goals = [.. user.Goals, goal];
				await _userService.UpdateAsync(user);
				return Ok();
			}
			return BadRequest("Record already exists");
		}

        [HttpDelete("{id}/goals/{goalId}")]
        public async Task<IActionResult> DeleteGoal(string id, string goalId)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }
            if (user.Goals.Any(pr => pr.Id == goalId))
            {
                user.Goals= user.Goals.Where(pr => pr.Id != goalId).ToArray();
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record does not exist");
        }

        [HttpGet("{id}/metas")]
        public async Task<ActionResult<Meta[]>> GetMetas(string id)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }

            return user.Meta;
        }

        [HttpPut("{id}/metas")]
        public async Task<IActionResult> UpdateMetas(string id, Meta[] metas)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
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
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }
            if (!user.Meta.Any(pr => pr.Id == meta.Id))
            {
                user.Meta = [.. user.Meta, meta];
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record already exists");
        }

        [HttpDelete("{id}/metas/{metaId}")]
        public async Task<IActionResult> DeleteMeta(string id, string metaId)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }
            if (user.Meta.Any(pr => pr.Id == metaId))
            {
                user.Meta= user.Meta.Where(pr => pr.Id != metaId).ToArray();
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record does not exist");
        }

        [HttpGet("{id}/criminalEvents")]
        public async Task<ActionResult<CriminalEvent[]>> GetCriminalEvents(string id)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
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
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
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
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }
            if (!user.CriminalEvents.Any(pr => pr.Id == criminalEvent.Id))
            {
                user.CriminalEvents = [.. user.CriminalEvents, criminalEvent];
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record already exists");
        }

        [HttpDelete("{id}/criminalEvents/{criminalEventId}")]
        public async Task<IActionResult> DeleteCriminalEvent(string id, string criminalEventId)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }
            if (user.CriminalEvents.Any(pr => pr.Id == criminalEventId))
            {
                user.CriminalEvents= user.CriminalEvents.Where(pr => pr.Id != criminalEventId).ToArray();
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record does not exist");
        }

        [HttpGet("{id}/medicalEvents")]
        public async Task<ActionResult<MedicalEvent[]>> GetMedicalEvents(string id)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
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
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
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
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }
            if (!user.MedicalEvents.Any(pr => pr.Id == medicalEvent.Id))
            {
                user.MedicalEvents = [.. user.MedicalEvents, medicalEvent];
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record already exists");
        }

        [HttpDelete("{id}/medicalEvents/{medicalEventId}")]
        public async Task<IActionResult> DeleteMedicalEvent(string id, string medicalEventId)
        {
            if (!IsAuthorized(id))
            {
                Unauthorized();
            }

            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound(Messages.USER_NOT_FOUND);
            }
            if (user.MedicalEvents.Any(pr => pr.Id == medicalEventId))
            {
                user.MedicalEvents= user.MedicalEvents.Where(pr => pr.Id != medicalEventId).ToArray();
                await _userService.UpdateAsync(user);
                return Ok();
            }
            return BadRequest("Record does not exist");
        }

        #endregion
    }
}
