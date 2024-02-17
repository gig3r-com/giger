using Giger.Models.UserModels;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.IO;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService) => _userService = userService;

        [HttpGet]
        public async Task<List<UserPrivate>> Get() => await _userService.GetAsync();

        [HttpGet("{id:length(40)}")]
        public async Task<ActionResult<UserPrivate>> Get(int id)
        {
            var user = await _userService.GetAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("byName")]
        public async Task<ActionResult<UserPrivate>> Get(string firstName)
        {
            var user = await _userService.GetByFirstNameAsync(firstName);
            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserPrivate newUser)
        {
            await _userService.CreateAsync(newUser);

            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }

        [HttpPut("{id:length(40)}")]
        public async Task<IActionResult> Update(int id, UserPrivate updatedUser)
        {
            var book = await _userService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            updatedUser.Id = book.Id;

            await _userService.UpdateAsync(id, updatedUser);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(int id)
        {
            var book = await _userService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            await _userService.RemoveAsync(id);

            return NoContent();
        }
    }
}
