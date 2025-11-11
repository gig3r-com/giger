using Giger.Models.Hacking;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HackConfigController(UserService userService, LoginService loginService, HackConfigService _hackConfigService) : AuthController(userService, loginService)
    {
        [HttpGet("get/all")]
        public async Task<ActionResult<List<HackConfig>>> GetAll()
        {
            return await _hackConfigService.GetAll();
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<HackConfig>> GetByCode(string id)
        {
            return await _hackConfigService.GetById(id);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Post(HackConfig config)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            await _hackConfigService.CreateAsync(config);
            return CreatedAtAction(nameof(Post), new { id = config.Id }, config);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(HackConfig config)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            await _hackConfigService.UpdateAsync(config);
            return Ok();
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> Remove(string id)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            await _hackConfigService.RemoveAsync(id);
            return Ok();
        }
    }

}
