using Giger.Models.Hashes;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HashesController(UserService userService, LoginService loginService,
        AccountService _accountService,
        GigService _gigService, 
        ConversationService _conversationService) : AuthController(userService, loginService)
    {
        [HttpGet("update/{id}")]
        public async Task<ActionResult<UpdateHashes>> Get(string id)
        {
            if (!IsAuthorized(id))
            {
                return Unauthorized();
            }
            var user = await _userService.GetAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var userName = user.Handle;
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
