using Giger.Services;
using Giger.Models.GigModels;
using Giger.Models.User;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Giger.Models.BankingModels;
using Giger.Models.MessageModels;
using System.ComponentModel;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GigController(GigService gigService, UserService userService, LoginService loginService, AnonymizedService anonymizedService,
        AccountService accountService, ConversationService conversationService, AccountController accountController)
        : AuthController(userService, loginService)
    {
        private readonly AccountService _accountService = accountService;
        private readonly ConversationService _conversationService = conversationService;
        private readonly AnonymizedService _anonymizedService = anonymizedService;
        private readonly GigService _gigService = gigService;

        private readonly AccountController _accountController = accountController;

        #region Endpoints

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
            List<Gig> gigs;
            if (IsRole(UserRoles.MODERATOR))
            {
                gigs = await _gigService.GetAllVisibleToModeratorAsync(requestSender.Id);
            }
            else
            {
                gigs = await _gigService.GetAllVisibleToUserAsync(requestSender.Id);
            }
            gigs.ForEach(gig => ObscureGig(gig, requestSender.Id));
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
            if (IsGodUser())
            {
                return gig;
            }
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            var userName = _loginService.GetByAuthTokenAsync(senderAuthToken)?.Result?.Username;
            if (userName == null)
            {
                Unauthorized(Messages.AUTH_TOKEN_EXPIRED);
                return null;
            }
            var requestSender = await _userService.GetByUserNameAsync(userName);
            ObscureGig(gig, requestSender.Id);
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
        public async Task<IActionResult> Post(Gig newGig, string openingMessage)
        {
            if (!IsAuthorized(newGig.AuthorId))
            {
                return Unauthorized();
            }

            newGig.Id = Guid.NewGuid().ToString();
            newGig.CreatedAt = GigerDateTime.Now;

            if (newGig.Mode == GigModes.CLIENT)
            {
                var account = await _accountService.GetByAccountNumberAsync(newGig.ProviderAccountNumber);
                if (account is null)
                {
                    return BadRequest(Messages.ACCOUNT_NOT_FOUND);
                }

                if (!FreezeFunds(newGig, account).Result)
                {
                    return BadRequest(Messages.ACCOUNT_INSUFFICIENT_FUNDS);
                }
            }
            else
            {
                if (_accountService.GetByAccountNumberAsync(newGig.ProviderAccountNumber).Result is null)
                {
                    return BadRequest(Messages.ACCOUNT_NOT_FOUND);
                }
            }

            if (newGig.IsAnonymizedAuthor)
            {
                var anonymizedUserName = Guid.NewGuid().ToString();
                var anonymizedUser = new AnonymizedUser
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = newGig.AuthorId,
                    DisplyedAs = anonymizedUserName
                };
                await _anonymizedService.CreateAsync(anonymizedUser);
                newGig.AuthorName = anonymizedUserName;
            }

            newGig.ConversationId = CreateNewGigConversation(newGig, openingMessage).Result.Id;

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

            if (oldGig.Status != GigStatus.AVAILABLE)
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

            if (gig.TakenById != null)
            {
                return BadRequest(Messages.GIG_ALREADY_TAKEN);
            }

            if (string.IsNullOrEmpty(accountNo))
            {
                return BadRequest("Account number is required");
            }

            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound(Messages.ACCOUNT_NOT_FOUND);
            }

            if (gig.Mode == GigModes.CLIENT)
            {
                gig.ProviderAccountNumber = accountNo;
            }
            else if (gig.Mode == GigModes.PROVIDER)
            {
                gig.ClientAccountNumber = accountNo;
                if (!FreezeFunds(gig, account).Result)
                {
                    return BadRequest(Messages.ACCOUNT_INSUFFICIENT_FUNDS);
                }
            }

            gig.TakenById = takenBy;
            gig.AcceptedAt = GigerDateTime.Now;
            gig.Status = GigStatus.IN_PROGRESS;

            var conversation = await _conversationService.GetAsync(gig.ConversationId);
            if (conversation is null)
            {
                conversation = await CreateNewGigConversation(gig, "");
                gig.ConversationId = conversation.Id;
            }
            var userTakenBy = await _userService.GetAsync(takenBy);
            conversation.Participants.Add(userTakenBy.Handle);
            conversation.Messages.Add(new Message(userTakenBy.Handle, "ACCEPTED"));
            _conversationService.UpdateAsync(conversation);

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

            if (gig.TakenById is null)
            {
                return BadRequest("Gig is not taken");
            }
            gig.Status = GigStatus.PENDING_CONFIRMATION;
            await _gigService.UpdateAsync(gig);
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
                return Unauthorized();
            }

            gig.Status = GigStatus.COMPLETED;
            ReturnFunds(gig);
            CompleteTransaction(gig);

            await _gigService.UpdateAsync(gig);

            return Ok();
        }

        [HttpPatch("{id}/dispute")]
        public async Task<IActionResult> PatchDisputeGig(string id, string reason)
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
                return Unauthorized();
            }

            gig.Status = GigStatus.DISPUTE;
            gig.MarkedAsComplaintAt = GigerDateTime.Now;
            gig.ComplaintReason = reason;

            await _gigService.UpdateAsync(gig);
            return Ok();
        }

        [HttpPatch("{id}/resolve")]
        public async Task<IActionResult> PatchResolveGig(string id, string clerkAccountNo, bool isClientRight)
        {
            if (!IsRole(UserRoles.MODERATOR))
            {
                return Unauthorized();
            }

            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }

            if (gig.TakenById is null)
            {
                return BadRequest("Gig is not taken");
            }

            gig.Status = GigStatus.COMPLETED;
            ReturnFunds(gig);
            if (!isClientRight)
            {
                CompleteTransaction(gig);
                var providerUser = await _userService.GetAsync(gig.TakenById);
                providerUser.GigReputation[gig.Category] += gig.Payout;
                _userService.UpdateAsync(providerUser);
            }
            PayDisputeFeeToClerk(gig, clerkAccountNo);

            await _gigService.UpdateAsync(gig);
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
            if (!IsAuthorized(gig.AuthorId)) /// or isGodUser??
            {
                return Unauthorized();
            }

            if (gig.Status != GigStatus.AVAILABLE || gig.Status != GigStatus.EXPIRED)
            {
                return BadRequest("Gig is not available for removal");
            }

            if (gig.Mode == GigModes.CLIENT)
            {
                ReturnFunds(gig);
            }

            await _gigService.RemoveAsync(id);
            return NoContent();
        }

        // Used only by GameMaster
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> PatchStatus(string id, GigStatus value)
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

            if (!conversation.Participants.Contains(userName))
            {
                conversation.Participants.Add(userName);
                await _conversationService.UpdateAsync(conversation);
            }

            return Ok();
        }

        #endregion

        #region Helpers methods

        private async Task<Conversation> CreateNewGigConversation(Gig newGig, string openingMessage)
        {
            var conversation = new Conversation()
            {
                Id = Guid.NewGuid().ToString(),
                GigConversation = true,
                Participants = [newGig.AuthorName],
                Messages = [new Message(newGig.AuthorName, openingMessage)]
            };
            await _conversationService.CreateAsync(conversation);
            return conversation;
        }

        private async Task<bool> FreezeFunds(Gig gig, Account account)
        {
            if (account.Balance < gig.Payout * 1.2m)
            {
                return false;
            }
                
            Transaction reserve = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = gig.ClientAccountNumber,
                To = "SYSTEM",
                Date = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_RESERVE_FUNDS_TRANSACTION_TITLE, gig.Title),
                Amount = gig.Payout
            };

            await _accountController.CreateTransaction(reserve);

            Transaction socialTax = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = gig.ClientAccountNumber,
                To = "SOCIAL",
                Date = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_TAX_TRANSACTION_TITLE, gig.Title),
                Amount = gig.Payout * 0.2m
            };

            await _accountController.CreateTransaction(socialTax);
            return true;
        }

        private async void ReturnFunds(Gig gig)
        {
            Transaction reserve = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = "SYSTEM",
                To = gig.ClientAccountNumber,
                Date = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_REFUND_TRANSACTION_TITLE, gig.Title),
                Amount = gig.Payout,
            };

            await _accountController.CreateTransaction(reserve);
        }

        private async void CompleteTransaction(Gig gig)
        {
            Transaction trx = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = gig.ClientAccountNumber,
                To = gig.ProviderAccountNumber,
                Date = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_PAYMENT_TITLE, gig.Title),
                Amount = gig.Payout,
            };

            await _accountController.CreateTransaction(trx);
        }

        private async void PayDisputeFeeToClerk(Gig gig, string clerkAccountNo)
        {
            Transaction trx = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = "SOCIAL",
                To = clerkAccountNo,
                Date = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_DISPUTE_FEE_TITLE, gig.Title),
                Amount = gig.Payout * 0.2m,
            };

            await _accountController.CreateTransaction(trx);
        }

        private void ObscureGig(Gig gig, string requestSenderId)
        {
            // if gig is already revealed by both client and author, do not obscure it for 3rd party
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

            if (IsGodUser())
            {
                return;
            }

            gig.Obscure();
        }
        #endregion
    }
}