using Giger.Services;
using Giger.Models.MessageModels;
using Microsoft.AspNetCore.Mvc;
using Giger.Connections.Handlers;

namespace Giger.Controllers
{
    [Route("api/[controller]")]
    public class ConversationController(UserService _userService, LoginService _loginService,
        ConversationService _conversationService, NotificationsSocketHandler _notificationsHandler, ConversationMessageHandler _conversationSocketHandler)
        : AuthController(_userService, _loginService)
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<Conversation>> Get(string id)
        {
            var conversation = await _conversationService.GetAsync(id);
            if (conversation is null)
            {
                return NotFound();
            }

            bool isAuthorized = false;
            foreach (var participant in conversation.Participants)
            {
                if (IsAuthorizedNotHacker(participant.UserHandle))
                {
                    isAuthorized = true;
                    break;
                }
            }

            if (!isAuthorized)
            {
                Unauthorized();
            }

            return conversation;
        }

        [HttpGet("byParticipant")]
        public async Task<ActionResult<List<Conversation>>> GetAllConversationOfParticipant(string participant)
        {
            if (!IsAuthorizedNotHacker(participant))
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

        [HttpPost()]
        public async Task<IActionResult> Post(Conversation newConversation)
        {
            if (string.IsNullOrEmpty(newConversation.Id))
            {
                newConversation.Id = Guid.NewGuid().ToString();
            }
            await _conversationService.CreateAsync(newConversation);
            return CreatedAtAction(nameof(Post), new { id = newConversation.Id }, newConversation);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(Conversation newConversation, bool isAnonymizedHandle)
        {
            if (string.IsNullOrEmpty(newConversation.Id))
            {
                newConversation.Id = Guid.NewGuid().ToString();
            }

            if (isAnonymizedHandle)
            {
                var sender = GetSenderUsername().Result;
                if (sender is null)
                {
                    return BadRequest(Messages.UNKNOWN_SENDER_USER_NOT_FOUND);
                }
                newConversation.AnonymizedUsers.Add(new ConversationAnonymizedUser
                {
                    ConversationId = newConversation.Id,
                    UserHandle = sender
                });
            }
            await _conversationService.CreateAsync(newConversation);

            return CreatedAtAction(nameof(Create), new { id = newConversation.Id }, newConversation);
        }

        [HttpPost("{conversationId}/message")]
        public async Task<IActionResult> PostMessage(string conversationId, Message newMessage)
        {
            var conversation = await _conversationService.GetAsync(conversationId);
            if (conversation is null)
            {
                return NotFound();
            }

            if (string.IsNullOrEmpty(newMessage.Id))
            {
                newMessage.Id = Guid.NewGuid().ToString();
                newMessage.Timestamp = GigerDateTime.Now;
                newMessage.ConversationId = conversationId;
            }

            conversation.Messages.Add(newMessage);
            await _conversationService.UpdateAsync(conversation);
            var participantHandles = conversation.Participants.Select(p => p.UserHandle).ToList();
            _conversationSocketHandler.SendMessageAsync(participantHandles, conversation.Id, newMessage);
            foreach (var participant in participantHandles)
            {
                _notificationsHandler.NotifyConversationId(participant, conversation);
            }
            return Ok();
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

            if (!conversation.Participants.Any(p => p.UserHandle == userName))
            {
                var participantHandles = conversation.Participants.Select(p => p.UserHandle).ToList();
                foreach (var participant in participantHandles)
                {
                    _notificationsHandler.NotifyConversationId(participant, conversation);
                }
                conversation.Participants.Add(new ConversationParticipant
                {
                    ConversationId = id,
                    UserHandle = userName
                });
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
