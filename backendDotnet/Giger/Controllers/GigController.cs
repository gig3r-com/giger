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
            if (IsGodUser())
            {
                return await _gigService.GetAllAsync();
            }
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            var userName = _loginService.GetByAuthTokenAsync(senderAuthToken)?.Result?.Username;
            if (userName == null)
            {
                Forbid("User authentication token expired");
            }
            var requestSender = await _userService.GetByUserNameAsync(userName);
            var gigs = await _gigService.GetAllAvailableAsync(requestSender.Id);
            gigs.ForEach(gig => ObscureGig(gig, requestSender.Id));
            return gigs;
        }

        [Obsolete("Use /all instead")]
        [HttpGet("get/allAvailable")]
        public async Task<List<Gig>> GetAllAvailable()
        {
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            var userName = _loginService.GetByAuthTokenAsync(senderAuthToken)?.Result?.Username;
            if (userName == null)
            {
                Forbid("User authentication token expired");
            }
            var requestSender = _userService.GetByUserNameAsync(userName).Result;
            var gigs = await _gigService.GetAllAvailableAsync(requestSender.Id);
            gigs.ForEach(gig => ObscureGig(gig, requestSender.Id));
            return gigs;
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

        private void ObscureGig(Gig gig, string requestSenderId)
        {
            if (IsGodUser())
            {
                return;
            }

            if (gig.IsRevealed && gig.IsRevealedByClient)
            {
                return;
            }

            if (gig.IsRevealed && gig.AuthorId == requestSenderId)
            {
                return;
            }

            if (gig.IsRevealedByClient && gig.TakenById == requestSenderId)
            {
                return;
            }

            gig.Obscure();
        }
    }
}