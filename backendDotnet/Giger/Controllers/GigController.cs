using Giger.Services;
using Giger.Models.GigModels;
using Giger.Models.User;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GigController(GigService gigService, UserService userService, LoginService loginService, AnonymizedService anonymizedService, AccountService accountService)
        : AuthController(userService, loginService)
    {
        private readonly AccountService _accountService = accountService;
        private readonly AnonymizedService _anonymizedService = anonymizedService;
        private readonly GigService _gigService = gigService;

        [HttpGet("get/all")]
        public async Task<List<Gig>> GetAll()
        {
            var allGigs = await _gigService.GetAllAsync();
            if (!IsGodUser())
            {
                allGigs.ForEach(ObscureGig);
            }
            return allGigs;
        }

        [HttpGet("get/allAvailable")]
        public async Task<List<Gig>> GetAllAvailable()
        {
            var allAvailableGigs = await _gigService.GetAllAvailableAsync();
            if (!IsGodUser())
            {
                allAvailableGigs.ForEach(ObscureGig);
            }
            return allAvailableGigs;
        }

        [HttpGet("get/allOwn")]
        public async Task<List<Gig>> GetAllOwn(string takenById)
        {
            var allOwnGigs = await _gigService.GetAllOwnAsync(takenById);
            if (!IsGodUser())
            {
                allOwnGigs.ForEach(ObscureGig);
            }
            return allOwnGigs;
        }

        [HttpGet("get/byId")]
        public async Task<ActionResult<Gig>> GetById(string id)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }
            if (!IsGodUser())
            {
                ObscureGig(gig);
            }
            return gig;
        }

        [HttpGet("get/byTitle")]
        public async Task<ActionResult<Gig>> GetByTitle(string title)
        {
            var gig = await _gigService.GetByFirstNameAsync(title);
            if (gig is null)
            {
                return NotFound();
            }
            ObscureGig(gig);
            return gig;
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

        [HttpPatch("{id}/complete")]
        public async Task<IActionResult> PatchCompleteGig(string id)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }

            if (gig.TakenById is null)
            {
                return BadRequest("Gig is not taken");
            }

            if (!IsAuthorized(gig.TakenById))
            {
                return Forbid();
            }

            gig.Status = GigStatus.COMPLETED;

            var clientAccount = await _accountService.GetByUserIdAsync(gig.TakenById);
            if (clientAccount is null)
            {
                return NotFound("Client account not found. Cannot complete Gig.");
            }

            clientAccount.Balance += gig.Payout;
            await _accountService.UpdateAsync(clientAccount.Id, clientAccount);
            await _gigService.UpdateAsync(id, gig);
            
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

        private void ObscureGig(Gig gig)
        {
            if (!gig.IsRevealed)
            {
                gig.Obscure();
            }
        }
    }
}