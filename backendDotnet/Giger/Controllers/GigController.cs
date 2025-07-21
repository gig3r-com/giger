using Giger.Services;
using Giger.Models.GigModels;
using Giger.Models.User;
using Microsoft.AspNetCore.Mvc;
using Giger.Models.BankingModels;
using Giger.Models.MessageModels;
using System.ComponentModel;
using Giger.Connections.Handlers;
using Microsoft.VisualBasic;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GigController(GigService gigService, UserService userService, LoginService loginService,
        AnonymizedService anonymizedService, AccountService accountService, ConversationService conversationService,
        GigerConfigService gigerConfigService, AccountController accountController, NotificationsSocketHandler notificationsHandler)
        : AuthController(userService, loginService)
    {
        private readonly AccountService _accountService = accountService;
        private readonly ConversationService _conversationService = conversationService;
        private readonly GigerConfigService _gigerConfigService = gigerConfigService;
        private readonly AnonymizedService _anonymizedService = anonymizedService;
        private readonly GigService _gigService = gigService;

        private readonly AccountController _accountController = accountController;

        private readonly NotificationsSocketHandler _notificationsHandler = notificationsHandler;

        #region Endpoints

        [HttpGet("hack/{userId}/getAll")]
        public async Task<List<Gig>> GetGigsHacked(string userId)
        {
            if (!IsAuthorized(userId))
            {
                Unauthorized(Messages.NO_ACCESS);
                return Enumerable.Empty<Gig>().ToList();
            }
            var gigs = await _gigService.GetAllOwnAsync(userId);
            gigs.ForEach(gig => ObscureGig(gig, userId));
            return gigs;
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

            if (newGig.Mode == GigModes.CLIENT)
            {
                var account = await _accountService.GetByAccountNumberAsync(newGig.ClientAccountNumber);
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

            //if (newGig.IsAnonymizedAuthor)
            //{
            //    var anonymizedUserName = Guid.NewGuid().ToString();
            //    var anonymizedUser = new AnonymizedUser
            //    {
            //        Id = Guid.NewGuid().ToString(),
            //        UserId = newGig.AuthorId,
            //        DisplyedAs = anonymizedUserName
            //    };
            //    await _anonymizedService.CreateAsync(anonymizedUser);
            //    newGig.AuthorName = anonymizedUserName;
            //}

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

            if (oldGig.Status != GigStatus.AVAILABLE || !IsGodUser())
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

            gig.TakenById = takenBy;
            gig.AcceptedAt = GigerDateTime.Now;
            gig.Status = GigStatus.IN_PROGRESS;

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

            var conversation = await _conversationService.GetAsync(gig.ConversationId);
            if (conversation is null)
            {
                conversation = await CreateNewGigConversation(gig);
                if (gig.IsAnonymizedAuthor)
                {
                    conversation.AnonymizedUsers.Add(gig.AuthorName);
                }
                gig.ConversationId = conversation.Id;
            }
            var userTakenBy = await _userService.GetAsync(takenBy);
            conversation.Participants.Add(userTakenBy.Handle);
            conversation.Messages.Add(new Message(userTakenBy.Handle, "ACCEPTED"));
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

            if (gig.TakenById is null)
            {
                return BadRequest("Gig is not taken");
            }

            if (!(IsAuthorized(gig.TakenById) || IsAuthorized(gig.AuthorId)))
            {
                return Unauthorized();
            }

            gig.Status = GigStatus.PENDING_CONFIRMATION;
            await _gigService.UpdateAsync(gig);
            if (gig.Mode == GigModes.CLIENT)
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

            if (gig.TakenById is null)
            {
                return BadRequest("Gig is not taken");
            }

            if (!(IsAuthorized(gig.TakenById) || IsAuthorized(gig.AuthorId)))
            {
                return Unauthorized();
            }

            gig.Status = GigStatus.COMPLETED;
            await ReturnFunds(gig);
            await CompleteTransaction(gig);
            await UpdateGigReputation(gig, true);

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

            if (gig.TakenById is null)
            {
                return BadRequest("Gig is not taken");
            }
            if (!(IsAuthorized(gig.TakenById) || IsAuthorized(gig.AuthorId)))
            {
                return Unauthorized();
            }

            gig.Status = GigStatus.DISPUTE;
            gig.MarkedAsComplaintAt = GigerDateTime.Now;
            gig.ComplaintReason = reason.text;

            await _gigService.UpdateAsync(gig);
            await NotifyStatusChanged(gig, true);
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
            await ReturnFunds(gig);
            if (!isClientRight)
            {
                await CompleteTransaction(gig);
                await UpdateGigReputation(gig, true);
            }
            else
            {
                await UpdateGigReputation(gig, false);
            }
            await PayDisputeFeeToClerk(gig, clerkAccountNo);

            await _gigService.UpdateAsync(gig);
            await NotifyStatusChanged(gig, true);
            return Ok();
        }

        private async Task UpdateGigReputation(Gig? gig, bool isPositive)
        {
            var cat = gig.Category.ToString();
            var providerUser = await _userService.GetAsync(gig.TakenById);
            if (providerUser != null)
            {
                if (!providerUser.AliasMap.ContainsKey(cat))
                {
                    var rep = providerUser.GigReputation[cat];
                    switch (rep)
                    {
                        case 0:
                            providerUser.AliasMap[cat] = ReputationLevel[0];
                            break;
                        case 1:
                            providerUser.AliasMap[cat] = ReputationLevel[1];
                            break;
                        case 2:
                            providerUser.AliasMap[cat] = ReputationLevel[2];
                            break;
                        case 3:
                            providerUser.AliasMap[cat] = ReputationLevel[3];
                            break;
                        case 4:
                            providerUser.AliasMap[cat] = ReputationLevel[4];
                            break;
                        case 5:
                            providerUser.AliasMap[cat] = ReputationLevel[5];
                            break;
                        default:
                            providerUser.AliasMap[cat] = providerUser.GigReputation[cat];
                            break;
                    }
                }

                if (isPositive)
                {
                    providerUser.AliasMap[cat] += gig.Payout;
                }
                else
                {
                    providerUser.AliasMap[cat] -= gig.Payout;
                }

                if (providerUser.AliasMap[cat] >= ReputationLevel[5])
                {
                    providerUser.GigReputation[cat] = 5;
                }
                else if (providerUser.AliasMap[cat] >= ReputationLevel[4])
                {
                    providerUser.GigReputation[cat] = 4;
                }
                else if (providerUser.AliasMap[cat] >= ReputationLevel[3])
                {
                    providerUser.GigReputation[cat] = 3;
                }
                else if (providerUser.AliasMap[cat] >= ReputationLevel[2])
                {
                    providerUser.GigReputation[cat] = 2;
                }
                else if (providerUser.AliasMap[cat] >= ReputationLevel[1])
                {
                    providerUser.GigReputation[cat] = 1;
                }
                else if (providerUser.AliasMap[cat] <= ReputationLevel[0])
                {
                    providerUser.GigReputation[cat] = 0;
                }



                _userService.UpdateAsync(providerUser);
            }
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

            if (gig.Status != GigStatus.AVAILABLE)
            {
                if (!IsRole(UserRoles.GOD))
                {
                    return BadRequest("Gig is not available for removal");
                }
            }

            if (gig.Mode == GigModes.CLIENT)
            {
                await ReturnFunds(gig);
            }
            gig.Status = GigStatus.EXPIRED;
            await _gigService.UpdateAsync(gig);
            return Ok();
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

            if (!conversation.Participants.Contains(userName))
            {
                conversation.Participants.Add(userName);
                await _conversationService.UpdateAsync(conversation);
            }

            return Ok();
        }

        #endregion

        #region Helpers methods

        private async Task NotifyConversationChanged(Gig gig)
        {
            var authorOriginalName = gig.AuthorName;
            if (gig.IsAnonymizedAuthor)
            {
                authorOriginalName = _userService.GetAsync(gig.AuthorId).Result?.Handle;
            }
            var conversation = await _conversationService.GetAsync(gig.ConversationId);
            await _notificationsHandler.NotifyGigConversation(authorOriginalName, conversation);

            conversation.Participants.ForEach(async participant =>
            {
                if (participant != gig.AuthorName)
                {
                    await _notificationsHandler.NotifyGigConversation(participant, conversation);
                }
            });
        }

        private async Task NotifyStatusChanged(Gig gig, bool notifyTaker)
        {
            var authorOriginalName = gig.AuthorName;
            if (gig.IsAnonymizedAuthor)
            {
                await _notificationsHandler.NotifyGigStatus(_userService.GetAsync(gig.AuthorId).Result?.Handle, gig);
            }
            else
            {
                await _notificationsHandler.NotifyGigStatus(authorOriginalName, gig);
            }
            if (notifyTaker && !string.IsNullOrEmpty(gig.TakenById))
            {
                await _notificationsHandler.NotifyGigStatus(gig.TakenById, gig);
            }
        }

        private async Task<Conversation> CreateNewGigConversation(Gig newGig)
        {
            var conversation = new Conversation()
            {
                Id = newGig.Id,
                GigConversation = true,
                Participants = [newGig.AuthorName],
                Messages = []
            };
            await _conversationService.CreateAsync(conversation);
            return conversation;
        }

        private async Task<bool> FreezeFunds(Gig gig, Account account)
        {
            var gigFeePercent = _gigerConfigService.Get().Result.GigFeePercentage;
            var gigFeeAmount = gig.Payout * gigFeePercent / 100m;
            if (account.Balance < gig.Payout + gigFeeAmount)
            {
                return false;
            }
            var takerHandle = _userService.GetAsync(gig.TakenById).Result?.Handle;
            string clientName = gig.Mode == GigModes.CLIENT ? gig.AuthorName : takerHandle;

            if (clientName == null)
            {
                return false;
            }

            if (gig.Mode == GigModes.CLIENT)
            {
                if (gig.IsAnonymizedAuthor)
                {
                    clientName = Gig.ANONIMIZED;
                }
            }

            string orderingParty;
            if (gig.Mode == GigModes.CLIENT)
            {
                orderingParty = gig.AuthorName;
            }
            else
            {
                orderingParty = takerHandle;
            }

            Transaction reserve = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = gig.ClientAccountNumber,
                FromUser = clientName,
                To = "1000000000",
                ToUser = "SYSTEM",
                Timestamp = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_RESERVE_FUNDS_TRANSACTION_TITLE, gig.Title),
                Amount = gig.Payout,
                OrderingParty = orderingParty
            };

            await _accountController.CreateTransaction(reserve, true);

            Transaction socialTax = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = gig.ClientAccountNumber,
                FromUser = clientName,
                To = null,
                ToUser = Factions.social_net.ToString(),
                Timestamp = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_TAX_TRANSACTION_TITLE, gig.Title),
                Amount = gigFeeAmount,
                OrderingParty = orderingParty
            };

            await _accountController.CreateTransaction(socialTax, true);
            return true;
        }

        private async Task ReturnFunds(Gig gig)
        {
            string clientName = gig.Mode == GigModes.CLIENT ? gig.AuthorName : _userService.GetAsync(gig.TakenById).Result?.Handle;
            if (gig.Mode == GigModes.CLIENT)
            {
                if (gig.IsAnonymizedAuthor)
                {
                    clientName = Gig.ANONIMIZED;
                }
            }

            string orderingParty;
            if (gig.Mode == GigModes.CLIENT)
            {
                orderingParty = gig.AuthorName;
            }
            else
            {
                orderingParty = _userService.GetAsync(gig.TakenById).Result?.Handle;
            }

            Transaction reserve = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = "10000000",
                FromUser = "SYSTEM",
                To = gig.ClientAccountNumber,
                ToUser = clientName,
                Timestamp = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_REFUND_TRANSACTION_TITLE, gig.Title),
                Amount = gig.Payout,
                OrderingParty = orderingParty
            };

            await _accountController.CreateTransaction(reserve, true);
        }

        private async Task CompleteTransaction(Gig gig)
        {
            string clientName, providerName;
            if (gig.Mode == GigModes.CLIENT)
            {
                clientName = gig.AuthorName;
                providerName = _userService.GetAsync(gig.TakenById).Result?.Handle;
            }
            else
            {
                clientName = _userService.GetAsync(gig.TakenById).Result?.Handle;
                providerName = gig.AuthorName;
            }

            string orderingParty;
            if (gig.Mode == GigModes.CLIENT)
            {
                orderingParty = gig.AuthorName;
                if (gig.IsAnonymizedAuthor)
                {
                    clientName = Gig.ANONIMIZED;
                }
            }
            else
            {
                orderingParty = _userService.GetAsync(gig.TakenById).Result?.Handle;
                if (gig.IsAnonymizedAuthor)
                {
                    providerName = Gig.ANONIMIZED;
                }
            }

            Transaction trx = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = gig.ClientAccountNumber,
                FromUser = clientName,
                To = gig.ProviderAccountNumber,
                ToUser = providerName,
                Timestamp = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_PAYMENT_TITLE, gig.Title),
                Amount = gig.Payout,
                OrderingParty = orderingParty
            };

            await _accountController.CreateTransaction(trx, true);
        }

        private async Task PayDisputeFeeToClerk(Gig gig, string clerkAccountNo)
        {
            var commissionPercent = _gigerConfigService.Get().Result.ModeratorCommissionPercentage/100m;
            Transaction trx = new()
            {
                Id = Guid.NewGuid().ToString(),
                From = null,
                FromUser = Factions.social_net.ToString(),
                To = clerkAccountNo,
                ToUser = _accountService.GetByAccountNumberAsync(clerkAccountNo).Result?.Owner,
                Timestamp = GigerDateTime.Now,
                Title = string.Format(Messages.GIG_DISPUTE_FEE_TITLE, gig.Title),
                Amount = gig.Payout * commissionPercent,
            };

            await _accountController.CreateTransaction(trx, true);
        }

        public Dictionary<int, int> ReputationLevel = new()
        {
            {0, 0 },
            {1, 1 },
            {2, 2001 },
            {3, 5001 },
            {4, 10001 },
            {5, 20001 },
        };

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
