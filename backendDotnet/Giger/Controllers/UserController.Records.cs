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

        #endregion
    }
}
