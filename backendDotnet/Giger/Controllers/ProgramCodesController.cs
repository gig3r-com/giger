using Giger.Models.Hacking;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgramCodesController(UserService userService, LoginService loginService, ProgramCodesService programCodesService) : AuthController(userService, loginService)
    {
        private readonly ProgramCodesService _programCodesService = programCodesService;

        [HttpGet("get/all")]
        public async Task<List<ProgramCodes>> GetAll()
        {
            return await _programCodesService.GetAll();
        }

        [HttpGet("get/isUsed")]
        public async Task<ActionResult<bool>> GetById(string programCode)
        {
            var codeObj = await _programCodesService.GetById(programCode);
            if (codeObj is null)
            {
                return NotFound();
            }

            return codeObj.IsUsed;
        }

        [HttpGet("get/code")]
        public async Task<ProgramCodes> GetByCode(string program)
        {
            return await _programCodesService.GetByCode(program);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Post(ProgramCodes newCode)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            await _programCodesService.CreateAsync(newCode);
            return CreatedAtAction(nameof(Post), new { id = newCode.Id }, newCode);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(ProgramCodes newCode)
        {
            await _programCodesService.UpdateAsync(newCode);
            return Ok();
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> Remove(string id)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            await _programCodesService.RemoveAsync(id);
            return Ok();
        }
    }
}
