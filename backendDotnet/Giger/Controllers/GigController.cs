using Giger.Services;
using Giger.Models.GigModels;
using Giger.Models.User;
using Microsoft.AspNetCore.Mvc;
using Giger.Models.BankingModels;
using Giger.Models.MessageModels;
using Giger.Connections.Handlers;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GigController(UserService userService, LoginService loginService,
        GigService _gigService,
        AccountService _accountService,
        ConversationService _conversationService,
        GigerConfigService _gigerConfigService,
        AccountController _accountController,
        NotificationsSocketHandler _notificationsHandler)
        : AuthController(userService, loginService)
    {
        #region Endpoints

        [HttpGet("hack/{userId}/getAll")]
        public async Task<List<Gig>> GetGigsHacked(string userId)
        {
            if (!IsAuthorized(userId))
            {
                Unauthorized(Messages.NO_ACCESS);
                return Enumerable.Empty<Gig>().ToList();
            }
            return await _gigService.GetAllOwnAsync(userId);
        }

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
                Unauthorized(Messages.AUTH_TOKEN_EXPIRED);
                return Enumerable.Empty<Gig>().ToList();
            }
            var requestSender = await _userService.GetByUserNameAsync(userName);
            if (requestSender is null)
            {
                BadRequest(Messages.USER_NOT_FOUND);
                return Enumerable.Empty<Gig>().ToList();
            }
            List<Gig> gigs;
            if (IsRole("MODERATOR"))
            {
                gigs = await _gigService.GetAllVisibleToModeratorAsync(requestSender.Id);
            }
            else
            {
                gigs = await _gigService.GetAllVisibleToUserAsync(requestSender.Id);
            }
            return gigs;
        }

        [HttpGet("get/{id}")]
        public async Task<Gig> GetById(string id)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return null;
            }
            return gig;
        }

        [HttpGet("get/{id}/conversation")]
        public async Task<ActionResult<Conversation>> GetConversation(string id)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound(Messages.GIG_NOT_FOUND);
            }

            if (gig.ConversationId is null)
            {
                return NotFound(Messages.GIG_NOT_FOUND_CONVERSATION);
            }

            var conversation = await _conversationService.GetAsync(gig.ConversationId);
            if (conversation is null)
            {
                return NotFound(Messages.GIG_NOT_FOUND_CONVERSATION);
            }
            return conversation;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Post(Gig newGig)
        {
            if (!IsAuthorized(newGig.AuthorId))
            {
                return Unauthorized();
            }

            if (string.IsNullOrEmpty(newGig.Id))
            {
                newGig.Id = Guid.NewGuid().ToString();
                newGig.CreatedAt = GigerDateTime.Now;
            }

            if (newGig.Mode == "authorIsHiring")
            {
                var account = await _accountService.GetByAccountNumberAsync(newGig.AuthorAccountNumber);
                if (account is null)
                {
                    return BadRequest(Messages.ACCOUNT_NOT_FOUND);
                }
            }
            else
            {
                if (string.IsNullOrEmpty(newGig.WorkerAccountNumber) ||
                    _accountService.GetByAccountNumberAsync(newGig.WorkerAccountNumber).Result is null)
                {
                    return BadRequest(Messages.ACCOUNT_NOT_FOUND);
                }
            }

            newGig.ConversationId = CreateNewGigConversation(newGig).Result.Id;

            await _gigService.CreateAsync(newGig);
            return CreatedAtAction(nameof(Post), new { id = newGig.Id }, newGig);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(Gig updatedGig)
        {
            if (!IsAuthorized(updatedGig.AuthorId))
            {
                return Unauthorized();
            }
            var oldGig = await _gigService.GetAsync(updatedGig.Id);
            if (oldGig is null)
            {
                return NotFound();
            }

            if (oldGig.Status != "AVAILABLE" || !IsGodUser())
            {
                return BadRequest("Gig is not available for update");
            }

            await _gigService.UpdateAsync(updatedGig);
            return Ok();
        }

        [HttpPatch("{id}/accept/{takenBy}")]
        public async Task<IActionResult> AcceptGig(string id, string takenBy, string accountNo = "")
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound(Messages.GIG_NOT_FOUND);
            }

            if (gig.WorkerId != null)
            {
                return BadRequest(Messages.GIG_ALREADY_TAKEN);
            }

            if (string.IsNullOrEmpty(accountNo))
            {
                return BadRequest("Account number is required");
            }

            var gigsTakenCount = await _gigService.GetLimitedUserGigsCountAsync(takenBy);
            if (gigsTakenCount >= _gigerConfigService.Get().Result.MaxGigsPerUser)
            {
                return BadRequest(Messages.GIG_MAX_GIGS_TAKEN);
            }

            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound(Messages.ACCOUNT_NOT_FOUND);
            }

            gig.WorkerId = takenBy;
            gig.Status = "IN_PROGRESS";

            if (gig.Mode == "authorIsHiring")
            {
                gig.WorkerAccountNumber = accountNo;
            }
            else if (gig.Mode == "authorWantsToBeHired")
            {
                gig.AuthorAccountNumber = accountNo;
            }

            var userTakenBy = await _userService.GetAsync(takenBy);
            gig.WorkerHandle = userTakenBy?.Handle;

            var conversation = await _conversationService.GetAsync(gig.ConversationId);
            if (conversation is null)
            {
                conversation = await CreateNewGigConversation(gig);
                if (gig.IsAnonymizedAuthor)
                {
                    conversation.AnonymizedUsers.Add(new ConversationAnonymizedUser
                    {
                        ConversationId = conversation.Id,
                        UserHandle = gig.AuthorHandle
                    });
                }
                gig.ConversationId = conversation.Id;
            }
            conversation.Participants.Add(new ConversationParticipant
            {
                ConversationId = conversation.Id,
                UserHandle = userTakenBy?.Handle ?? takenBy
            });
            conversation.Messages.Add(new Message
            {
                Id = Guid.NewGuid().ToString(),
                ConversationId = conversation.Id,
                Sender = userTakenBy?.Handle ?? takenBy,
                Type = "SYSTEM",
                Data = "ACCEPTED",
                Timestamp = GigerDateTime.Now
            });
            await _conversationService.UpdateAsync(conversation);
            await NotifyConversationChanged(gig);
            await NotifyStatusChanged(gig, false);
            await _gigService.UpdateAsync(gig);
            return Ok();
        }

        [HttpPatch("{id}/pending")]
        public async Task<IActionResult> PatchPendingGig(string id)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }

            if (gig.WorkerId is null)
            {
                return BadRequest("Gig is not taken");
            }

            if (!(IsAuthorized(gig.WorkerId) || IsAuthorized(gig.AuthorId)))
            {
                return Unauthorized();
            }

            gig.Status = "PENDING_CONFIRMATION";
            await _gigService.UpdateAsync(gig);
            if (gig.Mode == "authorIsHiring")
            {
                await NotifyStatusChanged(gig, false);
            }
            else
            {
                await NotifyStatusChanged(gig, true);
            }
            await NotifyStatusChanged(gig, true);
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

            if (gig.WorkerId is null)
            {
                return BadRequest("Gig is not taken");
            }

            if (!(IsAuthorized(gig.WorkerId) || IsAuthorized(gig.AuthorId)))
            {
                return Unauthorized();
            }

            gig.Status = "COMPLETED";
            await _gigService.UpdateAsync(gig);
            await NotifyStatusChanged(gig, true);
            return Ok();
        }

        public record DisputeReason(string text);

        [HttpPatch("{id}/dispute")]
        public async Task<IActionResult> PatchDisputeGig(string id, DisputeReason reason)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }

            if (gig.WorkerId is null)
            {
                return BadRequest("Gig is not taken");
            }
            if (!(IsAuthorized(gig.WorkerId) || IsAuthorized(gig.AuthorId)))
            {
                return Unauthorized();
            }

            gig.Status = "DISPUTE";
            gig.ComplaintReason = reason.text;

            await _gigService.UpdateAsync(gig);
            await NotifyStatusChanged(gig, true);
            return Ok();
        }

        [HttpPatch("{id}/resolve")]
        public async Task<IActionResult> PatchResolveGig(string id, string clerkAccountNo, bool isClientRight)
        {
            if (!IsRole("MODERATOR"))
            {
                return Unauthorized();
            }

            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }

            if (gig.WorkerId is null)
            {
                return BadRequest("Gig is not taken");
            }

            gig.Status = "COMPLETED";
            await _gigService.UpdateAsync(gig);
            await NotifyStatusChanged(gig, true);
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
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            await _gigService.RemoveAsync(id);
            return NoContent();
        }

        [HttpPatch("{id}/expire")]
        public async Task<IActionResult> Expire(string id)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }
            if (!IsAuthorized(gig.AuthorId))
            {
                return Unauthorized();
            }

            if (gig.Status != "AVAILABLE")
            {
                if (!IsRole("GOD"))
                {
                    return BadRequest("Gig is not available for removal");
                }
            }

            gig.Status = "EXPIRED";
            await _gigService.UpdateAsync(gig);
            return Ok();
        }

        // Used only by GameMaster
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> PatchStatus(string id, string value)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }

            gig.Status = value;
            await _gigService.UpdateAsync(gig);
            await NotifyStatusChanged(gig, true);
            return Ok();
        }

        [HttpPatch("{id}/coversation/join")]
        public async Task<IActionResult> JoinConversation(string id, string userName)
        {
            var conversation = await _conversationService.GetAsync(id);
            if (conversation is null)
            {
                return NotFound();
            }

            var participant = await _userService.GetByUserNameAsync(userName);
            if (participant is null)
            {
                return NotFound();
            }

            if (!conversation.Participants.Any(p => p.UserHandle == userName))
            {
                conversation.Participants.Add(new ConversationParticipant
                {
                    ConversationId = conversation.Id,
                    UserHandle = userName
                });
                await _conversationService.UpdateAsync(conversation);
            }

            return Ok();
        }

        #endregion

        #region Helpers methods

        private async Task NotifyConversationChanged(Gig gig)
        {
            var authorHandle = gig.AuthorHandle;
            if (gig.IsAnonymizedAuthor)
            {
                authorHandle = _userService.GetAsync(gig.AuthorId).Result?.Handle ?? gig.AuthorHandle;
            }
            var conversation = await _conversationService.GetAsync(gig.ConversationId);
            await _notificationsHandler.NotifyGigConversation(authorHandle, conversation);

            var participantHandles = conversation.Participants.Select(p => p.UserHandle).ToList();
            foreach (var participant in participantHandles)
            {
                if (participant != gig.AuthorHandle)
                {
                    await _notificationsHandler.NotifyGigConversation(participant, conversation);
                }
            }
        }

        private async Task NotifyStatusChanged(Gig gig, bool notifyTaker)
        {
            var authorHandle = gig.AuthorHandle;
            if (gig.IsAnonymizedAuthor)
            {
                await _notificationsHandler.NotifyGigStatus(_userService.GetAsync(gig.AuthorId).Result?.Handle, gig);
            }
            else
            {
                await _notificationsHandler.NotifyGigStatus(authorHandle, gig);
            }
            if (notifyTaker && !string.IsNullOrEmpty(gig.WorkerId))
            {
                var workerHandle = gig.WorkerHandle ?? _userService.GetAsync(gig.WorkerId).Result?.Handle;
                await _notificationsHandler.NotifyGigStatus(workerHandle, gig);
            }
        }

        private async Task<Conversation> CreateNewGigConversation(Gig newGig)
        {
            var conversation = new Conversation()
            {
                Id = newGig.Id,
                GigConversation = true,
            };
            conversation.Participants.Add(new ConversationParticipant
            {
                ConversationId = conversation.Id,
                UserHandle = newGig.AuthorHandle
            });
            await _conversationService.CreateAsync(conversation);
            return conversation;
        }

        #endregion
    }
}
