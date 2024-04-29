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

        [HttpGet("install")]
        public async Task<ActionResult<string>> Get(string userId, string revealCode)
        {
            var obscurableData = await _obscuredDataService.GetByRevealCodeIdAsync(revealCode);
            if (obscurableData is null)
            {
                HttpContext.Response.StatusCode = 406;
                return "Invalid code";
            }
            
            var implantData = await _gigerImplantsService.GetAsync(obscurableData.ObscurableId);
            if (implantData is null)
            {
                HttpContext.Response.StatusCode = 406;
                return "Invalid code";
            }

            var targetUser = await _userService.GetAsync(userId);
            if (targetUser is null)
            {
                HttpContext.Response.StatusCode = 404;
                return "Target user not found";
            }

            implantData.TimeStamp = GigerDateTime.Now;
            targetUser.MedicalEvents = [.. targetUser.MedicalEvents, implantData];
            await _userService.UpdateAsync(userId, targetUser);

            HttpContext.Response.StatusCode = 200;
            return $"An ... implant has been succesfully activated.";
        }

        [HttpGet("byName")]
        public async Task<ActionResult<MedicalEvent>> GetOwner(string name)
        {
            var gigerEvent = await _gigerImplantsService.GetByFirstNameAsync(name);
            if (gigerEvent is null)
            {
                return NotFound();
            }

            return gigerEvent;
        }

        [HttpPost]
        public async Task<IActionResult> Post(MedicalEvent newEvent)
        {
            await _gigerImplantsService.CreateAsync(newEvent);

            return CreatedAtAction(nameof(Get), new { id = newEvent.Id }, newEvent);
        }

        [HttpPut("id")]
        public async Task<IActionResult> Update(string id, MedicalEvent updatedEvent)
        {
            var gigerEvent = await _gigerImplantsService.GetAsync(id);

            if (gigerEvent is null)
            {
                return NotFound();
            }

            updatedEvent.Id = gigerEvent.Id;

            await _gigerImplantsService.UpdateAsync(id, updatedEvent);

            return NoContent();
        }

        [HttpDelete("id")]
        public async Task<IActionResult> Delete(string id)
        {
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