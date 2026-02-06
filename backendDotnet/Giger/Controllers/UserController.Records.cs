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

            // Return hash/count of records by group for change detection
            // Frontend expects these specific keys
            var result = new Dictionary<string, int>
            {
                ["goalsHash"] = 0,
                ["privateRecordsHash"] = 0,
                ["relationsHash"] = 0,
                ["criminalEventsHash"] = 0,
                ["medicalEventsHash"] = 0
            };

            var records = await _recordService.GetByUserIdAsync(id);
            if (records != null && records.Any())
            {
                // Map actual database groups to frontend expected keys if needed
                var groupCounts = records
                    .GroupBy(r => r.RecordGroup)
                    .ToDictionary(g => g.Key, g => g.Count());
                
                // For now, just use the actual counts we have
                foreach (var kvp in groupCounts)
                {
                    // If there's a mapping needed, do it here
                    // For now just set generic privateRecordsHash to total
                    result["privateRecordsHash"] += kvp.Value;
                }
            }

            return result;
        }

        #endregion
    }
}
