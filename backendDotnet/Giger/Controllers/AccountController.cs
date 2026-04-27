using Giger.Services;
using Giger.Models.BankingModels;
using Giger.Models.Logs;
using Microsoft.AspNetCore.Mvc;
using Giger.Extensions;
using Giger.Models.Users;
using Giger.Connections.Handlers;
using System.Linq.Expressions;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(
        UserService _userService, LoginService _loginService, AccountService _accountService, LogService _logService, NetworksService _networksService, TransactionService transactionService,
        NotificationsSocketHandler _notificationsHandler)
        : AuthController(_userService, _loginService)
        //: AuthController//(serviceProvider)
    {
        //public AccountController(UserService userService, LoginService loginService, AccountService accountService, LogService logService, NetworksService networksService,
        //NotificationsSocketHandler notificationsHandler) : base(userService, loginService)
        //{
        //    _accountService = accountService;
        //    _logService = logService;
        //    _networksService = networksService;
        //    _notificationsHandler = notificationsHandler;
        //}
        //
        //private readonly AccountService _accountService;// = (AccountService)ScopedServiceProvider.CreateScopedGigerService<AccountService>(serviceProvider);
        //private readonly LogService _logService;// = (LogService)ScopedServiceProvider.CreateScopedGigerService<LogService>(serviceProvider);
        //private readonly NetworksService _networksService;// = (NetworksService)ScopedServiceProvider.CreateScopedGigerService<NetworksService>(serviceProvider);
        //
        //private readonly NotificationsSocketHandler _notificationsHandler;// = notificationsHandler;

        //TODO put it into config
        private readonly Dictionary<WealthLevels, decimal> _transferLimits = new()
        {
            { WealthLevels.BROKE, 200 },
            { WealthLevels.IMPOVERISHED, 500 },
            { WealthLevels.STRUGGLING, 1000 },
            { WealthLevels.MODEST, 1000 },
            { WealthLevels.STABLE, 1500 },
            { WealthLevels.COMFORTABLE, 2000 },
            { WealthLevels.AFFLUENT, 2500 },
            { WealthLevels.ELITE, 5000 }
        };

        #region Account

        //[Obsolete]
        //[HttpGet("byId")]
        //public async Task<ActionResult<Account>> Get(string id)
        //{
        //    var account = await _accountService.GetByIdAsync(id);
        //    if (account is null)
        //    {
        //        return NotFound();
        //    }

        //    if (account.Type == AccountType.BUSINESS)
        //    {
        //        if (!HasAccessToFactionAccount(await GetSenderUser(), account.Owner))
        //        {
        //            return Unauthorized();
        //        }
        //    }
        //    else
        //    {
        //        if (!IsAuthorized(account.Owner))
        //        {
        //            return Unauthorized();
        //        }
        //    }

        //    return account;
        //}

        [HttpGet("allAccounts")]
        public async Task<List<string>> GetAllAccountNames()
        {
            var allActiveAccounts = await _accountService.GetAllAsync();
            return allActiveAccounts.Select(a => a.Name).ToList();
        }

        [HttpGet("byOwner")]
        public async Task<ActionResult<List<Account>>> GetByOwner(string owner)
        {
            if (!IsAuthorized(owner))
            {
                Unauthorized();
            }
            var accounts = await _accountService.GetByOwnerAsync(owner);
            if (!accounts.Any())
            {
                return NotFound();
            }

            await Parallel.ForEachAsync(accounts, async (account, ct) =>
            {
                var transactions = await transactionService.GetAllMatchingAccountAsync(account.AccountNumber);
                account.Transactions = transactions;
            });

            return accounts;

            // Uncomment if factions will have their own user handles
            //var user = await _userService.GetByUserNameAsync(owner);
            //if (user is not null)
            //{
            //    var businessAccount = await _accountService.GetByOwnerAsync(user.Faction.ToString());
            //    if (businessAccount is not null)
            //    {
            //        retValue.Add(businessAccount);
            //    }
            //}
            //return retValue;
        }

        [HttpGet("byAccountNumber")]
        public async Task<ActionResult<Account>> GetByAccountNumber(string accountNumber)
        {
            var account = await _accountService.GetByAccountNumberAsync(accountNumber);
            if (account is null)
            {
                return NotFound();
            }

            bool isAuthorized = false;
            foreach (var owner in account.Owners)
            {
                if (IsAuthorized(owner))
                {
                    isAuthorized = true;
                    break;
                }
            }

            if (!isAuthorized)
            {
                Unauthorized();
            }

            account.Transactions = transactionService.GetAllMatchingAccountAsync(account.AccountNumber).Result;
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
            if (account.Owners.Any(o => IsAuthorized(o)))
            {
                var trx = _accountService.GetTransactionsByAccountNumberAsync(accountNo).Result;
                return trx;
            }
            return Unauthorized();
        }

        [HttpPost("transaction")]
        public async Task<IActionResult> CreateTransaction(Transaction newTransaction, bool isGigTransfer = false)
        {
            //if (!IsAuthorized(newTransaction.OrderingUser))
            //{
            //    return Unauthorized();
            //}
            
            if (string.IsNullOrEmpty(newTransaction.Id))
            {
                newTransaction.Id = Guid.NewGuid().ToString();
            }
            if (newTransaction.Timestamp == null)
            {
                newTransaction.Timestamp = GigerDateTime.Now;
            }

            var senderAcc = await _accountService.GetByAccountNumberAsync(newTransaction.From);
            var receiverAcc = await _accountService.GetByAccountNumberAsync(newTransaction.To);

            if (senderAcc is null || receiverAcc is null)
            {
                return BadRequest("Wrong account number");
            }

            if (senderAcc.Id == receiverAcc.Id)
            {
                return BadRequest("Cannot transfer to yourself");
            }

            if (senderAcc.Balance < newTransaction.Amount)
            {
                return BadRequest(Messages.ACCOUNT_INSUFFICIENT_FUNDS);
            }

            // limits for gig transfers are not checked
            // if (!isGigTransfer)
            // {
            //     var user = await _userService.GetByUserNameAsync(giverAcc.Owner);
            //     if (user != null)
            //     {
            //         if (newTransaction.Amount > _transferLimits[user.WealthLevel])
            //         {
            //             return BadRequest(Messages.ACCOUNT_TRANSFER_LIMIT_EXCEEDED);
            //         }
            //     }
            // }

            //if (isGigTransfer)
            //{
                
            //}

            var clone = new Transaction(newTransaction);
            receiverAcc.Transactions.Add(clone);
            receiverAcc.Balance += clone.Amount;
            await _accountService.UpdateAsync(receiverAcc);

            senderAcc.Transactions.Add(newTransaction);
            senderAcc.Balance -= newTransaction.Amount;
            await _accountService.UpdateAsync(senderAcc);

            
            NotifyTransaction(receiverAcc, clone);
            //LogTransaction(clone, giverAcc, receiverAcc);

            return CreatedAtAction(nameof(CreateTransaction), new { id = newTransaction.Id }, newTransaction);
        }
        #endregion

        private async Task NotifyTransaction(Account account, Transaction transaction)
        {
            foreach (var user in account.Owners)
            {
                await _notificationsHandler.NotifyTransaction(user, account, transaction);
            }
            //switch (account.Type)
            //{
            //    case Account.PRIVATE_ACCOUNT_TYPE:
            //    {
            //        if (!account.Owners.Contains("SYSTEM"))
            //        {
            //            await _notificationsHandler.NotifyTransaction(account.Owner, account, transaction);
            //        }
            //        break;
            //    }
            //    case Account.BUSINESS_ACCOUNT_TYPE:
            //    {
            //        if (Enum.TryParse(account.Owner, out Factions faction))
            //        {
            //            var allFactionUsers = await _userService.GetAllFactionUser(faction);
            //            foreach (var user in allFactionUsers)
            //            {
            //                await _notificationsHandler.NotifyTransaction(user.Handle, account, transaction);
            //            }
            //        }
            //        break;
            //    }
            //}
        }

        private async Task NotifyAccount(Account account)
        {
            foreach (var user in account.Owners)
            {
                await _notificationsHandler.NotifyAccount(user, account);
            }

            //switch (account.Type)
            //{
            //    case AccountType.PRIVATE:
            //    {
            //        if (account.Owner != "SYSTEM")
            //        {
            //            await _notificationsHandler.NotifyAccount(account.Owner, account);
            //        }
            //        break;
            //    }
            //    case AccountType.BUSINESS:
            //    {
            //        if (Enum.TryParse(account.Owner, out Factions faction))
            //        {
            //            var allFactionUsers = await _userService.GetAllFactionUser(faction);
            //            foreach (var user in allFactionUsers)
            //            {
            //                await _notificationsHandler.NotifyAccount(user.Handle, account);
            //            }
            //        }
            //        break;
            //    }
            //}
        }

        //private async void LogTransaction(Transaction transaction, Account senderAccount, Account receiverAccount)
        //{
        //    var senderUser = await _userService.GetByUserNameAsync(transaction.OrderingUser ?? senderAccount.Owners.First());
        //    var receiverUser = await _userService.GetByUserNameAsync(receiverAccount.Owner);

        //    Log(senderUser?.SubnetworkId, senderUser?.SubnetworkName);

        //    if (senderUser?.SubnetworkId != receiverUser?.SubnetworkId)
        //    {
        //        Log(receiverUser?.SubnetworkId, receiverUser?.SubnetworkName);
        //    }

        //    void Log(string subnetworkId, string subnetworkName)
        //    {
        //        var log = new Log
        //        {
        //            Id = Guid.NewGuid().ToString(),
        //            Timestamp = GigerDateTime.Now,
        //            //SourceUserId = senderAccount.OwnerId,
        //            //SourceUserName = senderAccount.Owner,
        //            //TargetUserId = receiverAccount.OwnerId,
        //            //TargetUserName = receiverAccount.Owner,
        //            LogType = LogType.TRANSFER.ToString(),
        //            LogData = $"Transaction from {transaction.From} to {transaction.To} on {GigerDateTime.Now}",
        //            SubnetworkId = subnetworkId,
        //            SubnetworkName = subnetworkName
        //        };

        //        _logService.CreateAsync(log);
        //    }
        //}

        //private bool HasAccessToFactionAccount(User sender, string accountName)
        //{
        //    if (sender is null)
        //        return false;

        //    if (sender.Faction.ToString() == accountName)
        //        return true;

        //    return false;
        //}
    }
}
