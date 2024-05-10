using Giger.Services;
using Giger.Models.MessageModels;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversationController(UserService userService, LoginService loginService, ConversationService conversationService) : AuthController(userService, loginService)
    {
        private readonly ConversationService _conversationService = conversationService;

        [HttpGet("{id}")]
        public async Task<ActionResult<Conversation>> Get(string id)
        {
            var conversation = await _conversationService.GetAsync(id);
            if (conversation is null)
            {
                return NotFound();
            }

            return conversation;
        }

        [HttpGet("byParticipant")]
        public async Task<ActionResult<List<Conversation>>> GetAllConversationOfParticipant(string participant)
        {
            if (!IsAuthorized(participant))
            {
                Unauthorized();
            }

            var conversation = await _conversationService.GetAllWithParticipantAsync(participant);
            if (conversation is null)
            {
                return NotFound();
            }
            return conversation;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Conversation newConversation)
        {
            newConversation.Id = Guid.NewGuid().ToString();
            await _conversationService.CreateAsync(newConversation);

            return CreatedAtAction(nameof(Post), new { id = newConversation.Id }, newConversation);
        }

        [HttpPatch("{id}/participants")]
        public async Task<IActionResult> Update(string id, string userName)
        {
            var conversation = await _conversationService.GetAsync(id);
            if (conversation is null)
            {
                return NotFound();
            }

            var newParticipant = _userService.GetByUserNameAsync(userName);
            if (newParticipant is null)
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var conversation = await _conversationService.GetAsync(id);

            if (conversation is null)
            {
                return NotFound();
            }

            await _conversationService.RemoveAsync(id);

            return NoContent();
        }
    }
}