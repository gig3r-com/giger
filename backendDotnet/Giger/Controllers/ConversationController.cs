using Giger.Services;
using Giger.Models.MessageModels;
using Microsoft.AspNetCore.Mvc;
using Giger.Connections.Handlers;
using Giger.DTOs;

namespace Giger.Controllers
{
    [Route("api/[controller]")]
    public class ConversationController(UserService _userService, LoginService _loginService,
        ConversationService _conversationService, NotificationsSocketHandler _notificationsHandler, ConversationMessageHandler _conversationSocketHandler, GigerDbContext _dbContext)
        : AuthController(_userService, _loginService)
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<ConversationDTO>> Get(string id)
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

            return ConversationDTO.FromModel(conversation);
        }

        [HttpGet("byParticipant")]
        public async Task<ActionResult<List<ConversationDTO>>> GetAllConversationOfParticipant(string participant)
        {
            if (!IsAuthorizedNotHacker(participant))
            {
                Unauthorized();
            }

            var conversations = await _conversationService.GetAllWithParticipantAsync(participant);
            if (conversations is null)
            {
                return NotFound();
            }
            return conversations.Select(ConversationDTO.FromModel).ToList();
        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody] CreateConversationRequest request)
        {
            Console.WriteLine($"[ConversationController] Received request: Participants={string.Join(",", request.Participants)}, Count={request.Participants.Count}");
            
            var conversationId = string.IsNullOrEmpty(request.Id) ? Guid.NewGuid().ToString() : request.Id;
            
            Console.WriteLine($"[ConversationController] Creating conversation {conversationId} with {request.Participants.Count} participants");
            
            // Create conversation first
            var newConversation = new Conversation
            {
                Id = conversationId,
                GigConversation = request.GigConversation
            };
            
            await _conversationService.CreateAsync(newConversation);
            Console.WriteLine($"[ConversationController] Conversation created, adding participants...");
            
            // Then add participants
            foreach (var participantHandle in request.Participants)
            {
                Console.WriteLine($"[ConversationController] Adding participant: {participantHandle}");
                _dbContext.ConversationParticipants.Add(new ConversationParticipant
                {
                    ConversationId = conversationId,
                    UserHandle = participantHandle
                });
            }
            
            // Add anonymized users
            foreach (var anonymizedHandle in request.AnonymizedUsers)
            {
                Console.WriteLine($"[ConversationController] Adding anonymized user: {anonymizedHandle}");
                _dbContext.ConversationAnonymizedUsers.Add(new ConversationAnonymizedUser
                {
                    ConversationId = conversationId,
                    UserHandle = anonymizedHandle
                });
            }
            
            // Add initial messages
            foreach (var msg in request.Messages ?? new())
            {
                var messageId = string.IsNullOrEmpty(msg.Id) ? Guid.NewGuid().ToString() : msg.Id;
                Console.WriteLine($"[ConversationController] Adding message: {messageId}");
                _dbContext.Messages.Add(new Message
                {
                    Id = messageId,
                    ConversationId = conversationId,
                    Timestamp = DateTime.TryParse(msg.Date, out var parsedDate) 
                        ? DateTime.SpecifyKind(parsedDate, DateTimeKind.Utc)
                        : DateTime.UtcNow,
                    Sender = msg.Sender ?? "",
                    Data = msg.Text ?? "",
                    Type = "TEXT",
                    Hacker = "",
                    EpsilonNote = ""
                });
            }
            
            Console.WriteLine($"[ConversationController] Saving changes...");
            await _dbContext.SaveChangesAsync();
            Console.WriteLine($"[ConversationController] Changes saved, fetching conversation...");
            
            // Return DTO with all related data
            var createdConvo = await _conversationService.GetAsync(conversationId);
            Console.WriteLine($"[ConversationController] Returning conversation with {createdConvo.Participants.Count} participants");
            return CreatedAtAction(nameof(Post), new { id = conversationId }, ConversationDTO.FromModel(createdConvo));
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

            // Return DTO instead of raw entity
            var createdConvo = await _conversationService.GetAsync(newConversation.Id);
            return CreatedAtAction(nameof(Create), new { id = newConversation.Id }, ConversationDTO.FromModel(createdConvo));
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
