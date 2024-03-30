using Microsoft.AspNetCore.Mvc;
using Giger.Services;
using Giger.Models.BankingModels;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(UserService userService, LoginService loginService, AccountService accountService) : AuthController(userService, loginService)
    {
        private readonly AccountService _accountService = accountService;

        [HttpGet]
        public async Task<List<Account>> Get() => await _accountService.GetAllAsync();

        [HttpGet("id")]
        public async Task<ActionResult<Account>> Get(string id)
        {
            var account = await _accountService.GetAsync(id);
            if (account is null)
            {
                return NotFound();
            }

            return account;
        }

        [HttpGet("byParticipant")]
        public async Task<ActionResult<Account>> GetOwner(string owner)
        {
            var account = await _accountService.GetByFirstNameAsync(owner);
            if (account is null)
            {
                return NotFound();
            }

            return account;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Account newAccount)
        {
            await _accountService.CreateAsync(newAccount);

            return CreatedAtAction(nameof(Get), new { id = newAccount.Id }, newAccount);
        }

        [HttpPut("id")]
        public async Task<IActionResult> Update(string id, Account updatedAccount)
        {
            var account = await _accountService.GetAsync(id);

            if (account is null)
            {
                return NotFound();
            }

            updatedAccount.Id = account.Id;

            await _accountService.UpdateAsync(id, updatedAccount);

            return NoContent();
        }

        [HttpDelete("id")]
        public async Task<IActionResult> Delete(string id)
        {
            var account = await _accountService.GetAsync(id);

            if (account is null)
            {
                return NotFound();
            }

            await _accountService.RemoveAsync(id);

            return NoContent();
        }
    }
}