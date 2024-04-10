using Giger.Services;
using Giger.Models.BankingModels;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(UserService userService, LoginService loginService, AccountService accountService) : AuthController(userService, loginService)
    {
        private readonly AccountService _accountService = accountService;

        #region Account
        [HttpGet("byId")]
        public async Task<ActionResult<Account>> Get(string id)
        {
            var account = await _accountService.GetByIdAsync(id);
            if (account is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(account.Owner))
            {
                Forbid();
            }

            return account;
        }

        [HttpGet("byOwner")]
        public async Task<ActionResult<Account>> GetByOwner(string owner)
        {
            var account = await _accountService.GetByUserNameAsync(owner);
            if (account is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(owner))
            {
                Forbid();
            }

            return account;
        }

        [HttpGet("byAccountNumber")]
        public async Task<ActionResult<Account>> GetByAccountNumber(string accountNumber)
        {
            var account = await _accountService.GetByUserNameAsync(accountNumber);
            if (account is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(account.Owner))
            {
                Forbid();
            }

            return account;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Account newAccount)
        {
            if (IsGodUser())
            {
                Forbid();
            }

            newAccount.Id = ObjectId.GenerateNewId().ToString();
            await _accountService.CreateAsync(newAccount);
            return CreatedAtAction(nameof(Get), new { id = newAccount.Id }, newAccount);
        }

        [HttpPatch("{accountNo}/balance/add")]
        public async Task<IActionResult> PatchAddBalance(string accountNo, decimal value)
        {
            if (!IsGodUser())
            {
                return Forbid();
            }

            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound();
            }
            account.Balance += value;
            await _accountService.UpdateAsync(accountNo, account);
            return NoContent();
        }

        [HttpPatch("{accountNo}/balance/subtract")]
        public async Task<IActionResult> PatchSubtractBalance(string accountNo, decimal value)
        {
            if (!IsGodUser())
            {
                return Forbid();
            }

            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound();
            }
            account.Balance -= value;
            await _accountService.UpdateAsync(accountNo, account);
            return NoContent();
        }

        [HttpDelete("{accountNo}")]
        public async Task<IActionResult> Delete(string accountNo)
        {
            if (!IsGodUser())
            {
                return Forbid();
            }

            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound();
            }
            await _accountService.RemoveAsync(accountNo);
            return NoContent();
        }
        #endregion

        #region Transation
        [HttpGet("{accountNo}/transaction/all")]
        public async Task<ActionResult<List<Transaction>>> GetAll(string accountNo)
        {
            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(account.Owner))
            {
                return Forbid();
            }
            return account.Transactions.ToList();
        }

        [HttpPost("transaction")]
        public async Task<IActionResult> Post(Transaction newTransaction)
        {
            if (!IsAuthorized(newTransaction.From))
            {
                return Forbid();
            }

            var giverAcc = await _accountService.GetByAccountNumberAsync(newTransaction.From);
            var receiverAcc = await _accountService.GetByAccountNumberAsync(newTransaction.To);

            if (giverAcc is null || receiverAcc is null)
            {
                return BadRequest("Wrong account number");
            }

            if (giverAcc.Id == receiverAcc.Id)
            {
                return BadRequest("Cannot transfer to yourself");
            }

            if (giverAcc.Balance < newTransaction.Amount)
            {
                return BadRequest("Not enough balance");
            }

            newTransaction.Id = ObjectId.GenerateNewId().ToString();
            newTransaction.Date = DateTime.Now;

            giverAcc.Transactions = [..giverAcc.Transactions, newTransaction];
            
            giverAcc.Balance -= newTransaction.Amount;
            _accountService.UpdateAsync(giverAcc.Id, giverAcc);

            receiverAcc.Transactions = [.. receiverAcc.Transactions, newTransaction];
            receiverAcc.Balance += newTransaction.Amount;
            _accountService.UpdateAsync(receiverAcc.Id, receiverAcc);

            return CreatedAtAction(nameof(Post), new { id = newTransaction.Id }, newTransaction);
        }
        #endregion
    }
}