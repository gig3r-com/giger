using Microsoft.AspNetCore.Mvc;
using Giger.Services;
using Giger.Models.GigModels;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GigController(GigService gigService, UserService userService, LoginService loginService) : AuthController(userService, loginService)
    {
        private readonly GigService _gigService = gigService;

        [HttpGet]
        public async Task<List<Gig>> Get() => await _gigService.GetAllAsync();

        [HttpGet("id")]
        public async Task<ActionResult<Gig>> Get(int id)
        {
            var gig = await _gigService.GetAsync(id);
            if (gig is null)
            {
                return NotFound();
            }

            return gig;
        }

        [HttpGet("byTitle")]
        public async Task<ActionResult<Gig>> Get(string title)
        {
            var gig = await _gigService.GetByFirstNameAsync(title);
            if (gig is null)
            {
                return NotFound();
            }

            return gig;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Gig newGig)
        {
            await _gigService.CreateAsync(newGig);

            return CreatedAtAction(nameof(Get), new { id = newGig.Id }, newGig);
        }

        [HttpPut("id")]
        public async Task<IActionResult> Update(int id, Gig updatedGig)
        {
            var gig = await _gigService.GetAsync(id);

            if (gig is null)
            {
                return NotFound();
            }

            updatedGig.Id = gig.Id;

            await _gigService.UpdateAsync(id, updatedGig);

            return NoContent();
        }

        [HttpDelete("id")]
        public async Task<IActionResult> Delete(int id)
        {
            var gig = await _gigService.GetAsync(id);

            if (gig is null)
            {
                return NotFound();
            }

            await _gigService.RemoveAsync(id);

            return NoContent();
        }
    }
}