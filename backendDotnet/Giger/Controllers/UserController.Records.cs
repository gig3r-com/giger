using System.Text.Json;
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

		// --- PUT endpoints (create new records) ---

		[HttpPut("{id}/goals")]
		public async Task<IActionResult> AddGoal(string id, [FromBody] JsonElement body)
		{
			if (!IsAuthorized(id)) return Unauthorized();
			var record = MapRecordFromBody(id, body, "GOAL");
			await _recordService.CreateAsync(record);
			return Ok();
		}

		[HttpPut("{id}/metas")]
		public async Task<IActionResult> AddMeta(string id, [FromBody] JsonElement body)
		{
			if (!IsAuthorized(id)) return Unauthorized();
			var record = MapRecordFromBody(id, body, "META");
			await _recordService.CreateAsync(record);
			return Ok();
		}

		[HttpPut("{id}/privateRecords")]
		public async Task<IActionResult> AddPrivateRecord(string id, [FromBody] JsonElement body)
		{
			if (!IsAuthorized(id)) return Unauthorized();
			var record = MapRecordFromBody(id, body, "PRIVATE_RECORD");
			await _recordService.CreateAsync(record);
			return Ok();
		}

		[HttpPut("{id}/relations")]
		public async Task<IActionResult> AddRelation(string id, [FromBody] JsonElement body)
		{
			if (!IsAuthorized(id)) return Unauthorized();
			var record = MapRelationFromBody(id, body);
			await _recordService.CreateAsync(record);
			return Ok();
		}

		[HttpPut("{id}/medicalEvents")]
		public async Task<IActionResult> AddMedicalEvent(string id, [FromBody] JsonElement body)
		{
			if (!IsAuthorized(id)) return Unauthorized();
			var record = MapEventFromBody(id, body);
			if (!MedicalTypes.Contains(record.Type))
				return BadRequest("Invalid medical event type");
			await _recordService.CreateAsync(record);
			return Ok();
		}

		[HttpPut("{id}/criminalEvents")]
		public async Task<IActionResult> AddCriminalEvent(string id, [FromBody] JsonElement body)
		{
			if (!IsAuthorized(id)) return Unauthorized();
			var record = MapEventFromBody(id, body);
			if (!CriminalTypes.Contains(record.Type))
				return BadRequest("Invalid criminal event type");
			await _recordService.CreateAsync(record);
			return Ok();
		}

		// --- PATCH endpoints (update existing records) ---

		[HttpPatch("{id}/goals")]
		public Task<IActionResult> UpdateGoal(string id, [FromBody] JsonElement body) =>
			PatchRecord(id, body);

		[HttpPatch("{id}/metas")]
		public Task<IActionResult> UpdateMeta(string id, [FromBody] JsonElement body) =>
			PatchRecord(id, body);

		[HttpPatch("{id}/privateRecords")]
		public Task<IActionResult> UpdatePrivateRecord(string id, [FromBody] JsonElement body) =>
			PatchRecord(id, body);

		[HttpPatch("{id}/relations")]
		public Task<IActionResult> UpdateRelation(string id, [FromBody] JsonElement body) =>
			PatchRecord(id, body);

		[HttpPatch("{id}/medicalEvents")]
		public Task<IActionResult> UpdateMedicalEvent(string id, [FromBody] JsonElement body) =>
			PatchRecord(id, body);

		[HttpPatch("{id}/criminalEvents")]
		public Task<IActionResult> UpdateCriminalEvent(string id, [FromBody] JsonElement body) =>
			PatchRecord(id, body);

		// --- DELETE endpoints (remove events) ---

		[HttpDelete("{id}/medicalEvents/{eventId}")]
		public Task<IActionResult> DeleteMedicalEvent(string id, string eventId) =>
			DeleteRecordById(id, eventId);

		[HttpDelete("{id}/criminalEvents/{eventId}")]
		public Task<IActionResult> DeleteCriminalEvent(string id, string eventId) =>
			DeleteRecordById(id, eventId);

		// --- Helper methods ---

		private async Task<IActionResult> PatchRecord(string id, JsonElement body)
		{
			if (!IsAuthorized(id)) return Unauthorized();

			var recordId = body.TryGetProperty("id", out var idProp) ? idProp.GetString() : null;
			if (string.IsNullOrEmpty(recordId))
				return BadRequest("Missing id");

			var existing = await _recordService.GetByIdAsync(recordId);
			if (existing is null || existing.UserId != id)
				return NotFound("Record not found");

			// Update fields from body — records use title/description, events use name/eventDescription
			if (body.TryGetProperty("title", out var titleProp))
				existing.Title = titleProp.GetString();
			if (body.TryGetProperty("userName", out var userNameProp))
				existing.Title = userNameProp.GetString();
			if (body.TryGetProperty("name", out var nameProp))
				existing.Title = nameProp.GetString();
			if (body.TryGetProperty("description", out var descProp))
				existing.Data = descProp.GetString();
			if (body.TryGetProperty("eventDescription", out var eventDescProp))
				existing.Data = eventDescProp.GetString();
			if (body.TryGetProperty("status", out var statusProp))
				existing.SubCategory = statusProp.GetString();
			if (body.TryGetProperty("isRevealed", out var revealedProp))
				existing.IsRevealed = revealedProp.GetBoolean();

			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		private async Task<IActionResult> DeleteRecordById(string id, string eventId)
		{
			if (!IsAuthorized(id)) return Unauthorized();

			var existing = await _recordService.GetByIdAsync(eventId);
			if (existing is null || existing.UserId != id)
				return NotFound("Record not found");

			await _recordService.RemoveAsync(eventId);
			return Ok();
		}

		private static RecordType MapRecordFromBody(string userId, JsonElement body, string type)
		{
			return new RecordType
			{
				Id = body.TryGetProperty("id", out var idProp) ? idProp.GetString() ?? Guid.NewGuid().ToString() : Guid.NewGuid().ToString(),
				UserId = userId,
				RecordGroup = "offgame",
				Type = type,
				Title = body.TryGetProperty("title", out var titleProp) ? titleProp.GetString() : null,
				Data = body.TryGetProperty("description", out var descProp) ? descProp.GetString() : null,
				IsRevealed = body.TryGetProperty("isRevealed", out var revProp) && revProp.GetBoolean()
			};
		}

		private static RecordType MapRelationFromBody(string userId, JsonElement body)
		{
			return new RecordType
			{
				Id = body.TryGetProperty("id", out var idProp) ? idProp.GetString() ?? Guid.NewGuid().ToString() : Guid.NewGuid().ToString(),
				UserId = userId,
				RecordGroup = "offgame",
				Type = "RELATION",
				Title = body.TryGetProperty("userName", out var nameProp) ? nameProp.GetString() : null,
				Data = body.TryGetProperty("description", out var descProp) ? descProp.GetString() : null,
				IsRevealed = body.TryGetProperty("isRevealed", out var revProp) && revProp.GetBoolean()
			};
		}

		private static RecordType MapEventFromBody(string userId, JsonElement body)
		{
			DateTime? timestamp = null;
			if (body.TryGetProperty("timeStamp", out var tsProp) && tsProp.ValueKind == JsonValueKind.String)
			{
				var tsStr = tsProp.GetString();
				if (!string.IsNullOrEmpty(tsStr) && DateTime.TryParse(tsStr, out var parsed))
					timestamp = parsed.ToUniversalTime();
			}

			return new RecordType
			{
				Id = body.TryGetProperty("id", out var idProp) ? idProp.GetString() ?? Guid.NewGuid().ToString() : Guid.NewGuid().ToString(),
				UserId = userId,
				RecordGroup = "hard",
				Type = body.TryGetProperty("type", out var typeProp) ? typeProp.GetString() ?? "" : "",
				Title = body.TryGetProperty("name", out var nameProp) ? nameProp.GetString() : null,
				Data = body.TryGetProperty("eventDescription", out var descProp) ? descProp.GetString() : null,
				SubCategory = body.TryGetProperty("status", out var statusProp) ? statusProp.GetString() : "CURRENT",
				Timestamp = timestamp,
				IsRevealed = body.TryGetProperty("isRevealed", out var revProp) && revProp.GetBoolean()
			};
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
