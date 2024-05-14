using Microsoft.AspNetCore.Mvc;
using Giger.Services;
using Giger.Models.EventModels;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImplantsController(UserService userService, LoginService loginService, ImplantsService implantsService, ObscuredDataService obscuredDataService) 
        : AuthController(userService, loginService)
    {
        private readonly ImplantsService _gigerImplantsService = implantsService;
        private readonly ObscuredDataService _obscuredDataService = obscuredDataService;

        [HttpGet]
        public async Task<List<MedicalEvent>> Get() => await _gigerImplantsService.GetAllAsync();

        [HttpPatch("install")]
        public async Task<IActionResult> Install(string userId, string revealCode)
        {
            var obscurableData = await _obscuredDataService.GetByRevealCodeIdAsync(revealCode);
            if (obscurableData is null)
            {
                return BadRequest("Invalid code.");
            }
            
            var implantData = await _gigerImplantsService.GetAsync(obscurableData.ObscurableId);
            if (implantData is null)
            {
                return BadRequest("Invalid code.");
            }

            var targetUser = await _userService.GetAsync(userId);
            if (targetUser is null)
            {
                return NotFound("User not found.");
            }

            if (targetUser.MedicalEvents.Any(x => x.Name == implantData.Name))
            {
                return BadRequest("User already has this implant.");
            }

            implantData.TimeStamp = GigerDateTime.Now;
            targetUser.MedicalEvents = [.. targetUser.MedicalEvents, implantData];
            await _userService.UpdateAsync(targetUser);

            return Ok(implantData.GetType().Name);
        }

        [HttpPost]
        public async Task<IActionResult> Post(MedicalEvent newEvent)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            await _gigerImplantsService.CreateAsync(newEvent);
            return CreatedAtAction(nameof(Post), new { id = newEvent.Id }, newEvent);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, MedicalEvent updatedEvent)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            var gigerEvent = await _gigerImplantsService.GetAsync(id);
            if (gigerEvent is null)
            {
                return NotFound();
            }

            updatedEvent.Id = gigerEvent.Id;
            await _gigerImplantsService.UpdateAsync(updatedEvent);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            var gigerEvent = await _gigerImplantsService.GetAsync(id);
            if (gigerEvent is null)
            {
                return NotFound();
            }
            await _gigerImplantsService.RemoveAsync(id);
            return NoContent();
        }
    }
}