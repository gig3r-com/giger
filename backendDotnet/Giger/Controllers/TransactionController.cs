using Microsoft.AspNetCore.Mvc;
using Giger.Services;
using Giger.Models.BankingModels;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : Controller
    {
        private readonly TransactionService _transactionService;

        public TransactionController(TransactionService transactionService) => _transactionService = transactionService;

        [HttpGet]
        public async Task<List<Transaction>> Get() => await _transactionService.GetAllAsync();

        [HttpGet("id")]
        public async Task<ActionResult<Transaction>> Get(int id)
        {
            var transaction = await _transactionService.GetAsync(id);
            if (transaction is null)
            {
                return NotFound();
            }

            return transaction;
        }

        [HttpGet("byFrom")]
        public async Task<ActionResult<Transaction>> GetByFrom(int from)
        {
            var transaction = await _transactionService.GetByFromAsync(from);
            if (transaction is null)
            {
                return NotFound();
            }

            return transaction;
        }

        [HttpGet("byTo")]
        public async Task<ActionResult<Transaction>> GetByTo(int to)
        {
            var transaction = await _transactionService.GetByToAsync(to);
            if (transaction is null)
            {
                return NotFound();
            }

            return transaction;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Transaction newTransaction)
        {
            await _transactionService.CreateAsync(newTransaction);

            return CreatedAtAction(nameof(Get), new { id = newTransaction.Id }, newTransaction);
        }

        [HttpPut("id")]
        public async Task<IActionResult> Update(int id, Transaction updatedTransaction)
        {
            var transaction = await _transactionService.GetAsync(id);

            if (transaction is null)
            {
                return NotFound();
            }

            updatedTransaction.Id = transaction.Id;

            await _transactionService.UpdateAsync(id, updatedTransaction);

            return NoContent();
        }

        [HttpDelete("id")]
        public async Task<IActionResult> Delete(int id)
        {
            var transaction = await _transactionService.GetAsync(id);

            if (transaction is null)
            {
                return NotFound();
            }

            await _transactionService.RemoveAsync(id);

            return NoContent();
        }
    }
}