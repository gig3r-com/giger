using Giger.Models;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    //[ApiController]
    [Route("api/[controller]")]
    public class GigerConfigController(UserService userService, LoginService loginService, GigerConfigService gigerConfigService) : AuthController(userService, loginService)
    {
        private readonly GigerConfigService _gigerConfigService = gigerConfigService;

        [HttpGet("get")]
        public async Task<ActionResult<GigerConfig>> Get()
        {
            return await _gigerConfigService.Get();
        }

        [HttpPatch("update")]
        public async Task<IActionResult> Update(GigerConfig config)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            await _gigerConfigService.UpdateAsync(config);
            return Ok();
        }

        [HttpPatch("tax")]
        public async Task<IActionResult> UpdateTax(int tax)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            var config = await _gigerConfigService.Get();
            config.GigFeePercentage = tax;
            await _gigerConfigService.UpdateAsync(config);
            return Ok();
        }

        [HttpPatch("commission")]
        public async Task<IActionResult> UpdateCommission(int commisssion)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            var config = await _gigerConfigService.Get();
            config.ModeratorCommissionPercentage = commisssion;
            await _gigerConfigService.UpdateAsync(config);
            return Ok();
        }

        [HttpPatch("gigLimit")]
        public async Task<IActionResult> UpdateGigLimit(int limit)
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            var config = await _gigerConfigService.Get();
            config.MaxGigsPerUser = limit;
            await _gigerConfigService.UpdateAsync(config);
            return Ok();
        }
    }
}
