using Giger.Services;
using Giger.Models.GigModels;
using Giger.Models.User;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GigController(GigService gigService, UserService userService, LoginService loginService, AnonymizedService anonymizedService) : AuthController(userService, loginService)
    {
        private readonly GigService _gigService = gigService;
        private readonly AnonymizedService _anonymizedService = anonymizedService;

        [HttpGet("get/all")]
        public async Task<List<Gig>> GetAll() => await _gigService.GetAllAsync();

        [HttpGet("get/allAvailable")]
        public async Task<List<Gig>> GetAllAvailable() => await _gigService.GetAllAvailableAsync();

        [HttpGet("get/allInProgress")]
        public async Task<List<Gig>> GetAllAvailable(string takenById) => await _gigService.GetAllInProgressAsync(takenById);

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
            if (!IsAuthorized(newGig.AuthorId))
            {
                return Forbid();
            }

            newGig.Id = ObjectId.GenerateNewId().ToString();
            if (newGig.IsAnonymizedAuthor)
            {
                var anonymizedUserName = Guid.NewGuid().ToString();
                var anonymizedUser = new AnonymizedUser
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    UserId = newGig.AuthorId,
                    DisplyedAs = anonymizedUserName
                };
                await _anonymizedService.CreateAsync(anonymizedUser);
                newGig.AuthorName = anonymizedUserName;
            }
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

            if (_gigService.GetAsync(updatedGig.Id) is null)
            {
                return NotFound();
            }

            await _gigService.UpdateAsync(updatedGig.Id, updatedGig);
            return Ok();
        }

        [HttpDelete("{id}/remove")]
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

        [HttpPatch("{id}/takenBy")]
        public async Task<IActionResult> PatchTakenBy(string id, string takenBy)
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
                return BadRequest("Gig is already taken");
            }
            gig.TakenById = takenBy;
            await _gigService.UpdateAsync(id, gig);
            return Ok();
        }

        [HttpPatch("{id}/status")]
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