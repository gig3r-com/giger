using Giger.Services;
using Giger.Models.BankingModels;
using Giger.Models.Logs;
using Microsoft.AspNetCore.Mvc;
using Giger.Extensions;
using Giger.Models.User;
using Giger.Connections.Handlers;
using System.Linq.Expressions;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(UserService userService, LoginService loginService, AccountService accountService,
        LogService logService, NetworksService networksService, NotificationsSocketHandler notificationsHandler)
        : AuthController(userService, loginService)
    {
        private readonly AccountService _accountService = accountService;
        private readonly LogService _logService = logService;
        private readonly NetworksService _networksService = networksService;

        private readonly NotificationsSocketHandler _notificationsHandler = notificationsHandler;

        #region Account

        [Obsolete]
        [HttpGet("byId")]
        public async Task<ActionResult<Account>> Get(string id)
        {
            var account = await _accountService.GetByIdAsync(id);
            if (account is null)
            {
                return NotFound();
            }

            if (account.Type == AccountType.BUSINESS)
            {
                if (!HasAccessToFactionAccount(await GetSenderUser(), account.Owner))
                {
                    return Unauthorized();
                }
            }
            else
            {
                if (!IsAuthorized(account.Owner))
                {
                    return Unauthorized();
                }
            }

            return account;
        }

        [HttpGet("allAccounts")]
        public async Task<List<string>> GetAllAccountNames()
        {
            var allActiveAccounts = await _accountService.GetAllActiveAsync();
            return allActiveAccounts.Select(a => a.Owner).ToList();
        }

        [HttpGet("byOwner")]
        public async Task<ActionResult<List<Account>>> GetByOwner(string owner)
        {
            if (!IsAuthorized(owner))
            {
                Unauthorized();
            }
            var account = await _accountService.GetByAccountNameAsync(owner);
            if (account is null)
            {
                return NotFound();
            }

            var retValue = new List<Account>() { account };

            var user = await _userService.GetByUserNameAsync(owner);
            if (user is not null)
            {
                var businessAccount = await _accountService.GetByAccountNameAsync(user.Faction.ToString());
                if (businessAccount is not null)
                {
                    retValue.Add(businessAccount);
                }
            }

            return retValue;
        }

        [HttpGet("byAccountNumber")]
        public async Task<ActionResult<Account>> GetByAccountNumber(string accountNumber)
        {
            var account = await _accountService.GetByAccountNumberAsync(accountNumber);
            if (account is null)
            {
                return NotFound();
            }

            if (!IsAuthorized(account.Owner))
            {
                Unauthorized();
            }

            return account;
        }

        [HttpPost]
        public async Task<IActionResult> CreatedAccount(Account newAccount)
        {
            if (IsGodUser())
            {
                Unauthorized();
            }
            if (string.IsNullOrEmpty(newAccount.Id))
            {
                newAccount.Id = Guid.NewGuid().ToString();
            }
            await _accountService.CreateAsync(newAccount);
            return CreatedAtAction(nameof(CreatedAccount), new { id = newAccount.Id }, newAccount);
        }

        [HttpPut("{accountNo}")]
        public async Task<IActionResult> Update(string accountNo, Account updatedAccount)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound();
            }

            account = updatedAccount;
            await _accountService.UpdateAsync(account);
            NotifyAccount(account);
            return NoContent();
        }

        [HttpPatch("{accountNo}/balance/add")]
        public async Task<IActionResult> PatchAddBalance(string accountNo, decimal value)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound();
            }
            account.Balance += value;
            await _accountService.UpdateAsync(account);
            NotifyAccount(account);
            return NoContent();
        }

        [HttpPatch("{accountNo}/balance/subtract")]
        public async Task<IActionResult> PatchSubtractBalance(string accountNo, decimal value)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound();
            }
            account.Balance -= value;
            await _accountService.UpdateAsync(account); 
            NotifyAccount(account);
            return NoContent();
        }

        [HttpDelete("{accountNo}")]
        public async Task<IActionResult> Delete(string accountNo)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound();
            }
            await _accountService.RemoveAsync(account.Id);
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
                return Unauthorized();
            }
            return account.Transactions;
        }

        [HttpPost("transaction")]
        public async Task<IActionResult> CreateTransaction(Transaction newTransaction)
        {
            if (!IsAuthorized(newTransaction.FromUser))
            {
                return Unauthorized();
            }
            
            if (string.IsNullOrEmpty(newTransaction.Id))
            {
                newTransaction.Id = Guid.NewGuid().ToString();
                newTransaction.Timestamp = GigerDateTime.Now;
            }

            var giverAcc = await _accountService.GetByAccountNumberAsync(newTransaction.From);
            if (giverAcc is null)
            {
                giverAcc = await _accountService.GetByAccountNameAsync(newTransaction.FromUser);
                newTransaction.From = giverAcc?.AccountNumber ?? newTransaction.From;
            }

            var receiverAcc = await _accountService.GetByAccountNumberAsync(newTransaction.To);
            if (receiverAcc is null)
            {
                receiverAcc = await _accountService.GetByAccountNameAsync(newTransaction.ToUser);
                newTransaction.To = receiverAcc?.AccountNumber ?? newTransaction.To;
            }

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

            giverAcc.Transactions.Add(newTransaction);
            giverAcc.Balance -= newTransaction.Amount;
            await _accountService.UpdateAsync(giverAcc);

            receiverAcc.Transactions.Add(newTransaction);
            receiverAcc.Balance += newTransaction.Amount;
            await _accountService.UpdateAsync(receiverAcc);
            NotifyTransaction(receiverAcc, newTransaction);
            LogTransaction(newTransaction, giverAcc, receiverAcc);

            return CreatedAtAction(nameof(CreateTransaction), new { id = newTransaction.Id }, newTransaction);
        }
        #endregion

        private async Task NotifyTransaction(Account account, Transaction transaction)
        {
            switch (account.Type)
            {
                case AccountType.PRIVATE:
                {
                    await _notificationsHandler.NotifyTransaction(account.Owner, account.Id, transaction.Id);
                    break;
                }
                case AccountType.BUSINESS:
                {
                    if (Enum.TryParse(account.Owner, out Factions faction))
                    {
                        var allFactionUsers = await _userService.GetAllFactionUser(faction);
                        foreach (var user in allFactionUsers)
                        {
                            await _notificationsHandler.NotifyTransaction(user.Handle, account.Id, transaction.Id);
                        }
                    }
                    break;
                }
            }
        }

        private async Task NotifyAccount(Account account)
        {
            switch (account.Type)
            {
                case AccountType.PRIVATE:
                {
                    await _notificationsHandler.NotifyAccount(account.Owner, account.Id);
                    break;
                }
                case AccountType.BUSINESS:
                {
                    if (Enum.TryParse(account.Owner, out Factions faction))
                    {
                        var allFactionUsers = await _userService.GetAllFactionUser(faction);
                        foreach (var user in allFactionUsers)
                        {
                            await _notificationsHandler.NotifyAccount(user.Handle, account.Id);
                        }
                    }
                    break;
                }
            }
        }

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
                    Id = Guid.NewGuid().ToString(),
                    Timestamp = GigerDateTime.Now,
                    SourceUserId = senderAccount.OwnerId,
                    SourceUserName = senderAccount.Owner,
                    TargetUserId = receiverAccount.OwnerId,
                    TargetUserName = receiverAccount.Owner,
                    LogType = LogType.TRANSFER,
                    LogData = $"Transaction from {transaction.From} to {transaction.To} on {GigerDateTime.Now}",
                    SubnetworkId = subnetworkId,
                    SubnetworkName = subnetworkName
                };

                _logService.CreateAsync(log);
            }
        }

        private bool HasAccessToFactionAccount(UserPrivate sender, string accountName)
        {
            if (sender is null)
                return false;

            if (sender.Faction.ToString() == accountName)
                return true;

            return false;
        }
    }
}
