using Giger.Models.Logs;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogController(UserService userService, LoginService loginService,
        LogService _logService,
        NetworksService _networksService)
        : AuthController(userService, loginService)
    {
        [HttpGet("{subnetworkName}/all")]
        public async Task<List<Log>> GetAllSubnetworkLogs(string subnetworkName) => await _logService.GetAllForSubnetworkAsync(subnetworkName);

        [HttpPost()]
        public async Task<IActionResult> PostLog(Log newLog)
        {
            newLog.Timestamp = GigerDateTime.Now;
            if (string.IsNullOrEmpty(newLog.Id))
            {
                newLog.Id = Guid.NewGuid().ToString();
            }
            await _logService.CreateAsync(newLog);

            return CreatedAtAction(nameof(PostLog), new { id = newLog.Id }, newLog);
        }

        [HttpPut]
        public async Task<IActionResult> PutLog(Log updatedLog)
        {
            var log = await _logService.GetByIdAsync(updatedLog.Id);
            if (log is null)
            {
                return NotFound();
            }

            await _logService.UpdateAsync(updatedLog);
            return Ok();
        }

        [HttpPost("hack")]
        public async Task<IActionResult> PostHack(Log newLog)
        {
            if (newLog.Subnetwork != null)
            {
                var subNetwork = await _networksService.GetSubnetworkByFirstNameAsync(newLog.Subnetwork);
                if (subNetwork != null)
                {
                    newLog.Timestamp = GigerDateTime.Now;
                    if (newLog.LogType == "SUBNETWORK_SECURITY_BREACH")
                    {
                        subNetwork.PastHacks = [.. subNetwork.PastHacks, newLog.Timestamp.ToString()];
                    }
                    await _networksService.UpdateSubnetworkAsync(subNetwork);
                }
            }

            if (string.IsNullOrEmpty(newLog.Id))
            {
                newLog.Id = Guid.NewGuid().ToString();
            }
            await _logService.CreateAsync(newLog);

            return CreatedAtAction(nameof(PostHack), new { id = newLog.Id }, newLog);
        }
    }
}
