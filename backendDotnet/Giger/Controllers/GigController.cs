using Microsoft.AspNetCore.Mvc;
using Giger.Services;
using Giger.Models.GigModels;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GigController(GigService gigService, UserService userService, LoginService loginService) : AuthController(userService, loginService)
    {
        private readonly GigService _gigService = gigService;

        [HttpGet("get/all")]
        public async Task<List<Gig>> GetAll() => await _gigService.GetAllAsync();

        [HttpGet("get/byId")]
        public async Task<ActionResult<Gig>> GetById(string id)
        {
            var gig = await _gigService.GetAsync(id);
            return gig != null ? gig : NotFound();
        }

        [HttpGet("get/byTitle")]
        public async Task<ActionResult<Gig>> GetByTitle(string title)
        {
            var gig = await _gigService.GetByFirstNameAsync(title);
            return gig != null ? gig : NotFound();
        }

        [HttpPost("create")]
        public async Task<IActionResult> Post(Gig newGig)
        {
            await _gigService.CreateAsync(newGig);
            return CreatedAtAction(nameof(Post), new { id = newGig.Id }, newGig);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(Gig updatedGig)
        {
            if (!IsAuthorized(updatedGig.AuthorId))
            {
                return Forbid();
            }
            await _gigService.UpsertAsync(updatedGig);
            return Ok();
        }

        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> Remove(string id)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }
            if (!IsAuthorized(gig.AuthorId))
            {
                return Forbid();
            }
            await _gigService.RemoveAsync(id);
            return NoContent();
        }

        [HttpPatch("update/{id}/takenBy")]
        public async Task<IActionResult> PatchTakenBy(string id, string value)
         {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }
            if (!IsAuthorized(gig.AuthorId))
            {
                return Forbid();
            }
            if (gig.TakenById != null)
            {
                // gig taken reponse
            }
            gig.TakenById = value;
            await _gigService.UpdateAsync(id, gig);
            return Ok();
        }

        [HttpPatch("update/{id}/status")]
        public async Task<IActionResult> PatchStatus(string id, GigStatus value)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }
            if (!IsAuthorized(gig.AuthorId))
            {
                return Forbid();
            }

            gig.Status = value;
            await _gigService.UpdateAsync(id, gig);
            return Ok();
        }
    }
}