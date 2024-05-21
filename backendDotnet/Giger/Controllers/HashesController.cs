using Giger.Models.Hashes;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HashesController(UserService userService, LoginService loginService, AccountService accountService,
        GigService gigService, ConversationService conversationService) : AuthController(userService, loginService)
    {
        private AccountService _accountService  = accountService;
        private GigService _gigService = gigService;
        private ConversationService _conversationService = conversationService;

        [HttpGet("update/{id}")]
        public async Task<ActionResult<UpdateHashes>> Get(string userName)
        {
            if (!IsAuthorized(userName))
            {
                return Unauthorized();
            }
            var user = await _userService.GetByUserNameAsync(userName);
            var account = await _accountService.GetByAccountNameAsync(userName);
            var businessAccount = await _accountService.GetByAccountNameAsync(user.Faction.ToString());
            var conversations = await _conversationService.GetAllWithParticipantAsync(userName);
            var gigConversations = await _conversationService.GetAllGigConversationsWithParticipantAsync(userName);
            var gigs = await _gigService.GetAllOwnAsync(user.Id);

            var hashes = new UpdateHashes(account, businessAccount, conversations, gigConversations, gigs);

            return Ok(hashes);
        }
    }
}
