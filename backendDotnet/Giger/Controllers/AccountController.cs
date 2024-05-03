using Giger.Services;
using Giger.Models.BankingModels;
using Giger.Models.Logs;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(UserService userService, LoginService loginService, AccountService accountService, LogService logService, NetworksService networksService) 
        : AuthController(userService, loginService)
    {
        private readonly AccountService _accountService = accountService;
        private readonly LogService _logService = logService;
        private readonly NetworksService _networksService = networksService;

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
        public async Task<IActionResult> CreatedAccount(Account newAccount)
        {
            if (IsGodUser())
            {
                Forbid();
            }

            newAccount.Id = ObjectId.GenerateNewId().ToString();
            await _accountService.CreateAsync(newAccount);
            return CreatedAtAction(nameof(CreatedAccount), new { id = newAccount.Id }, newAccount);
        }

        [HttpPut("{accountNo}")]
        public async Task<IActionResult> Update(string accountNo, Account updatedAccount)
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

            account = updatedAccount;
            await _accountService.UpdateAsync(account);
            return NoContent();
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
            await _accountService.UpdateAsync(account);
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
            await _accountService.UpdateAsync(account);
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
            return account.Transactions;
        }

        [HttpPost("transaction")]
        public async Task<IActionResult> CreateTransaction(Transaction newTransaction)
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
                return BadRequest(Messages.ACCOUNT_INSUFFICIENT_FUNDS);
            }

            newTransaction.Id = ObjectId.GenerateNewId().ToString();
            newTransaction.Date = GigerDateTime.Now;

            giverAcc.Transactions.Add(newTransaction);
            giverAcc.Balance -= newTransaction.Amount;
            await _accountService.UpdateAsync(giverAcc);

            receiverAcc.Transactions.Add(newTransaction);
            receiverAcc.Balance += newTransaction.Amount;
            await _accountService.UpdateAsync(receiverAcc);

            LogTransaction(newTransaction, giverAcc, receiverAcc);

            return CreatedAtAction(nameof(CreateTransaction), new { id = newTransaction.Id }, newTransaction);
        }
        #endregion

        private async void LogTransaction(Transaction transaction, Account senderAccount, Account receiverAccount)
        {
            var giverUser = await _userService.GetByUserNameAsync(senderAccount.Owner);
            var receiverUser = await _userService.GetByUserNameAsync(receiverAccount.Owner);

            Log(giverUser?.SubnetworkId, giverUser?.SubnetworkName);

            if (giverUser?.SubnetworkId != receiverUser?.SubnetworkId)
            {
                Log(receiverUser?.SubnetworkId, receiverUser?.SubnetworkName);
            }

            void Log(string subnetworkId, string subnetworkName)
            {
                var log = new Log
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Timestamp = GigerDateTime.Now,
                    SourceUserId = senderAccount.OwnerId,
                    SourceUserName = senderAccount.Owner,
                    TargetUserId = receiverAccount.OwnerId,
                    TargetUserName = receiverAccount.Owner,
                    LogType = LogType.Transfer,
                    LogData = $"Transaction from {transaction.From} to {transaction.To} on {GigerDateTime.Now}",
                    SubnetworkId = subnetworkId,
                    SubnetworkName = subnetworkName
                };

                _logService.CreateAsync(log);
            }
        }
    }
}