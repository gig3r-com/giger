using Giger.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    partial class UserController
    {
		#region UserRecords

		[HttpGet("{id}/records")]
		public async Task<ActionResult<List<RecordType>>> GetRecords(string id, string? group = null)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			if (group != null)
			{
				return await _recordService.GetByUserIdAndGroupAsync(id, group);
			}
			return await _recordService.GetByUserIdAsync(id);
		}

		[HttpGet("{id}/goals")]
		public async Task<ActionResult<object[]>> GetGoals(string id)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			var records = await _recordService.GetByUserIdAsync(id);
			return records
				.Where(r => r.Type == "GOAL")
				.Select(r => (object)new
				{
					id = r.Id,
					userId = r.UserId,
					title = r.Title ?? "",
					description = r.Data ?? "",
					recordType = "GOAL",
					isRevealed = r.IsRevealed
				})
				.ToArray();
		}

		[HttpGet("{id}/metas")]
		public async Task<ActionResult<object[]>> GetMetas(string id)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			var records = await _recordService.GetByUserIdAsync(id);
			return records
				.Where(r => r.Type == "META")
				.Select(r => (object)new
				{
					id = r.Id,
					userId = r.UserId,
					title = r.Title ?? "",
					description = r.Data ?? "",
					recordType = "META"
				})
				.ToArray();
		}

		[HttpGet("{id}/privateRecords")]
		public async Task<ActionResult<object[]>> GetPrivateRecords(string id)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			var records = await _recordService.GetByUserIdAsync(id);
			return records
				.Where(r => r.Type == "PRIVATE_RECORD")
				.Select(r => (object)new
				{
					id = r.Id,
					userId = r.UserId,
					title = r.Title ?? "",
					description = r.Data ?? "",
					recordType = "PRIVATE_RECORD",
					isRevealed = r.IsRevealed
				})
				.ToArray();
		}

		[HttpGet("{id}/relations")]
		public async Task<ActionResult<object[]>> GetRelations(string id)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			var records = await _recordService.GetByUserIdAsync(id);
			return records
				.Where(r => r.Type == "RELATION")
				.Select(r => (object)new
				{
					id = r.Id,
					userId = r.UserId,
					userName = r.Title ?? "",
					description = r.Data ?? "",
					recordType = "RELATION",
					isRevealed = r.IsRevealed
				})
				.ToArray();
		}

		private static readonly string[] MedicalTypes = ["CYBERWARE", "MEDICAL_DRUG", "MEDICAL_PROCEDURE", "SYMPTOM"];
		private static readonly string[] CriminalTypes = ["VICTIM", "SUSPECT", "WANTED", "WITNESS", "PUNISHMENT"];

		[HttpGet("{id}/medicalEvents")]
		public async Task<ActionResult<object[]>> GetMedicalEvents(string id)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			var records = await _recordService.GetByUserIdAsync(id);
			return records
				.Where(r => MedicalTypes.Contains(r.Type))
				.Select(r => (object)new
				{
					id = r.Id,
					name = r.Title ?? "",
					eventDescription = r.Data ?? "",
					type = r.Type,
					status = r.SubCategory ?? "CURRENT",
					timeStamp = r.Timestamp?.ToString("o") ?? "",
					isRevealed = r.IsRevealed
				})
				.ToArray();
		}

		[HttpGet("{id}/criminalEvents")]
		public async Task<ActionResult<object[]>> GetCriminalEvents(string id)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			var records = await _recordService.GetByUserIdAsync(id);
			return records
				.Where(r => CriminalTypes.Contains(r.Type))
				.Select(r => (object)new
				{
					id = r.Id,
					name = r.Title ?? "",
					eventDescription = r.Data ?? "",
					type = r.Type,
					status = r.SubCategory ?? "CURRENT",
					timeStamp = r.Timestamp?.ToString("o") ?? "",
					isRevealed = r.IsRevealed
				})
				.ToArray();
		}

		[HttpPost("{id}/records")]
		public async Task<IActionResult> AddRecord(string id, RecordType record)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			record.UserId = id;
			if (string.IsNullOrEmpty(record.Id))
			{
				record.Id = Guid.NewGuid().ToString();
			}
			await _recordService.CreateAsync(record);
			return Ok();
		}

		[HttpPut("{id}/records/{recordId}")]
		public async Task<IActionResult> UpdateRecord(string id, string recordId, RecordType record)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			var existing = await _recordService.GetByIdAsync(recordId);
			if (existing is null || existing.UserId != id)
			{
				return NotFound(Messages.USER_NOT_FOUND);
			}
			record.Id = recordId;
			record.UserId = id;
			await _recordService.UpdateAsync(record);
			return Ok();
		}

		[HttpDelete("{id}/records/{recordId}")]
		public async Task<IActionResult> DeleteRecord(string id, string recordId)
		{
			if (!IsAuthorized(id))
			{
				return Unauthorized();
			}

			var existing = await _recordService.GetByIdAsync(recordId);
			if (existing is null || existing.UserId != id)
			{
				return NotFound("Record does not exist");
			}
			await _recordService.RemoveAsync(recordId);
			return Ok();
		}

        [HttpGet("simple/hashes/byId")]
        public async Task<ActionResult<Dictionary<string, int>>> GetRecordHashesById(string id)
        {
            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }

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

            var records = await _recordService.GetByUserIdAsync(id);

            var goalCount = records.Count(r => r.Type == "GOAL");
            var privateCount = records.Count(r => r.Type == "PRIVATE_RECORD");
            var relationCount = records.Count(r => r.Type == "RELATION");
            var criminalCount = records.Count(r => CriminalTypes.Contains(r.Type));
            var medicalCount = records.Count(r => MedicalTypes.Contains(r.Type));

            var result = new Dictionary<string, int>
            {
                ["goalsHash"] = goalCount,
                ["privateRecordsHash"] = privateCount,
                ["relationsHash"] = relationCount,
                ["criminalEventsHash"] = criminalCount,
                ["medicalEventsHash"] = medicalCount
            };

            return result;
        }

        #endregion
    }
}
