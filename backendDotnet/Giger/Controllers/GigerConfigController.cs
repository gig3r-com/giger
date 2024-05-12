using Giger.Models;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    public class GigerConfigController(UserService userService, LoginService loginService, GigerConfigService gigerConfigService) : AuthController(userService, loginService)
    {
        private readonly GigerConfigService _gigerConfigService = gigerConfigService;

        [HttpGet()]
        public async Task<ActionResult<GigerConfig>> GetAll()
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }
            return await _gigerConfigService.Get();
        }

        [HttpPatch()]
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
