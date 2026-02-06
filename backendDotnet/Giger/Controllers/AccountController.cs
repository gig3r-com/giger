using Giger.Services;
using Giger.Models.BankingModels;
using Giger.Models.Logs;
using Giger.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Giger.Models.User;
using Giger.Connections.Handlers;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(
        UserService _userService, LoginService _loginService, AccountService _accountService,
        LogService _logService, NetworksService _networksService,
        NotificationsSocketHandler _notificationsHandler, GigerDbContext _dbContext)
        : AuthController(_userService, _loginService)
    {
        #region Account

        [HttpGet("byId")]
        public async Task<ActionResult<Account>> Get(string id)
        {
            var account = await _accountService.GetByIdAsync(id);
            if (account is null)
            {
                return NotFound();
            }

            var firstOwner = account.Owners.FirstOrDefault()?.UserHandle;
            if (account.Type == "BUSINESS")
            {
                if (!HasAccessToFactionAccount(await GetSenderUser(), firstOwner))
                {
                    return Unauthorized();
                }
            }
            else
            {
                if (firstOwner != null && !IsAuthorized(firstOwner))
                {
                    return Unauthorized();
                }
            }

            return account;
        }

        [HttpGet("allAccounts")]
        public async Task<List<string>> GetAllAccountNames()
        {
            var allAccounts = await _accountService.GetAllAsync();
            return allAccounts.Select(a => a.Owners.FirstOrDefault()?.UserHandle ?? a.Name ?? "").ToList();
        }

        [HttpGet("byOwner")]
        public async Task<ActionResult<List<AccountDTO>>> GetByOwner(string owner)
        {
            if (!IsAuthorized(owner))
            {
                Unauthorized();
            }
            var account = await _accountService.GetByOwnerHandleAsync(owner);
            if (account is null)
            {
                return NotFound();
            }

            var accounts = new List<Account> { account };

            var user = await _userService.GetByUserNameAsync(owner);
            if (user is not null && user.Faction != null)
            {
                var businessAccount = await _accountService.GetByOwnerHandleAsync(user.Faction);
                if (businessAccount is not null)
                {
                    accounts.Add(businessAccount);
                }
            }

            var result = new List<AccountDTO>();
            foreach (var acc in accounts)
            {
                result.Add(await MapAccountToDTO(acc));
            }
            return result;
        }

        private async Task<AccountDTO> MapAccountToDTO(Account account)
        {
            // Get all transactions for this account (both sent and received)
            var accountNumber = account.AccountNumber;
            var allTransactions = await _dbContext.Transactions
                .Where(t => t.AccountId == account.Id || (t.To == accountNumber && t.AccountId != account.Id))
                .ToListAsync();

            // Collect all unique account numbers to resolve owner handles
            var accountNumbers = allTransactions
                .SelectMany(t => new[] { t.From, t.To })
                .Where(n => !string.IsNullOrEmpty(n))
                .Distinct()
                .ToList();

            // Build account number -> owner handle map
            var accountOwnerMap = await _dbContext.Accounts
                .Include(a => a.Owners)
                .Where(a => accountNumbers.Contains(a.AccountNumber))
                .ToDictionaryAsync(
                    a => a.AccountNumber,
                    a => a.Owners.FirstOrDefault()?.UserHandle ?? a.Name ?? ""
                );

            var transactionDtos = allTransactions.Select(t => new TransactionDTO
            {
                Id = t.Id,
                From = t.From ?? "",
                To = t.To ?? "",
                FromUser = t.From != null && accountOwnerMap.TryGetValue(t.From, out var fromUser) ? fromUser : "",
                ToUser = t.To != null && accountOwnerMap.TryGetValue(t.To, out var toUser) ? toUser : "",
                Amount = t.Amount,
                Timestamp = t.Timestamp?.ToString("o") ?? "",
                Title = t.Title,
                OrderingParty = t.OrderingUser
            }).ToList();

            return new AccountDTO
            {
                Id = account.Id,
                Type = account.Type,
                AccountNumber = account.AccountNumber,
                Balance = account.Balance,
                Owner = account.Owners.FirstOrDefault()?.UserHandle ?? account.Name ?? "",
                Transactions = transactionDtos
            };
        }

        [HttpGet("byAccountNumber")]
        public async Task<ActionResult<Account>> GetByAccountNumber(string accountNumber)
        {
            var account = await _accountService.GetByAccountNumberAsync(accountNumber);
            if (account is null)
            {
                return NotFound();
            }

            var firstOwner = account.Owners.FirstOrDefault()?.UserHandle;
            if (firstOwner != null && !IsAuthorized(firstOwner))
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

        #region Transaction
        [HttpGet("{accountNo}/transaction/all")]
        public async Task<ActionResult<List<Transaction>>> GetAll(string accountNo)
        {
            var account = await _accountService.GetByAccountNumberAsync(accountNo);
            if (account is null)
            {
                return NotFound();
            }

            var firstOwner = account.Owners.FirstOrDefault()?.UserHandle;
            if (firstOwner != null && !IsAuthorized(firstOwner))
            {
                return Unauthorized();
            }
            return account.Transactions;
        }

        [HttpPost("transaction")]
        public async Task<IActionResult> CreateTransaction(Transaction newTransaction, bool isGigTransfer = false)
        {
            if (string.IsNullOrEmpty(newTransaction.Id))
            {
                newTransaction.Id = Guid.NewGuid().ToString();
            }
            if (newTransaction.Timestamp == null)
            {
                newTransaction.Timestamp = GigerDateTime.Now;
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

            var clone = new Transaction
            {
                Id = Guid.NewGuid().ToString(),
                From = newTransaction.From,
                To = newTransaction.To,
                Title = newTransaction.Title,
                Amount = newTransaction.Amount,
                Timestamp = newTransaction.Timestamp,
                OrderingUser = newTransaction.OrderingUser,
                AccountId = receiverAcc.Id
            };

            receiverAcc.Transactions.Add(clone);
            receiverAcc.Balance += clone.Amount;
            await _accountService.UpdateAsync(receiverAcc);

            newTransaction.AccountId = giverAcc.Id;
            giverAcc.Transactions.Add(newTransaction);
            giverAcc.Balance -= newTransaction.Amount;
            await _accountService.UpdateAsync(giverAcc);

            NotifyTransaction(receiverAcc, clone);
            LogTransaction(clone, giverAcc, receiverAcc);

            return CreatedAtAction(nameof(CreateTransaction), new { id = newTransaction.Id }, newTransaction);
        }
        #endregion

        private async Task NotifyTransaction(Account account, Transaction transaction)
        {
            var firstOwner = account.Owners.FirstOrDefault()?.UserHandle;
            if (account.Type == "PRIVATE")
            {
                if (firstOwner != null && firstOwner != "SYSTEM")
                {
                    await _notificationsHandler.NotifyTransaction(firstOwner, account, transaction);
                }
            }
            else if (account.Type == "BUSINESS")
            {
                if (firstOwner != null)
                {
                    var allFactionUsers = await _userService.GetAllFactionUser(firstOwner);
                    foreach (var user in allFactionUsers)
                    {
                        await _notificationsHandler.NotifyTransaction(user.Handle, account, transaction);
                    }
                }
            }
        }

        private async Task NotifyAccount(Account account)
        {
            var firstOwner = account.Owners.FirstOrDefault()?.UserHandle;
            if (account.Type == "PRIVATE")
            {
                if (firstOwner != null && firstOwner != "SYSTEM")
                {
                    await _notificationsHandler.NotifyAccount(firstOwner, account);
                }
            }
            else if (account.Type == "BUSINESS")
            {
                if (firstOwner != null)
                {
                    var allFactionUsers = await _userService.GetAllFactionUser(firstOwner);
                    foreach (var user in allFactionUsers)
                    {
                        await _notificationsHandler.NotifyAccount(user.Handle, account);
                    }
                }
            }
        }

        private async void LogTransaction(Transaction transaction, Account senderAccount, Account receiverAccount)
        {
            var senderOwner = senderAccount.Owners.FirstOrDefault()?.UserHandle ?? "SYSTEM";
            var receiverOwner = receiverAccount.Owners.FirstOrDefault()?.UserHandle ?? "SYSTEM";
            var giverUser = await _userService.GetByUserNameAsync(senderOwner);
            var receiverUser = await _userService.GetByUserNameAsync(receiverOwner);

            LogToSubnetwork(giverUser?.Subnetwork);

            if (giverUser?.Subnetwork != receiverUser?.Subnetwork)
            {
                LogToSubnetwork(receiverUser?.Subnetwork);
            }

            void LogToSubnetwork(string subnetworkName)
            {
                var log = new Log
                {
                    Id = Guid.NewGuid().ToString(),
                    Timestamp = GigerDateTime.Now,
                    SourceUser = senderOwner,
                    TargetUser = receiverOwner,
                    LogType = "TRANSFER",
                    LogData = $"Transaction from {transaction.From} to {transaction.To} on {GigerDateTime.Now}",
                    Subnetwork = subnetworkName
                };

                _logService.CreateAsync(log);
            }
        }

        private bool HasAccessToFactionAccount(User sender, string accountOwner)
        {
            if (sender is null)
                return false;

            if (sender.Faction != null && sender.Faction == accountOwner)
                return true;

            return false;
        }
    }
}
