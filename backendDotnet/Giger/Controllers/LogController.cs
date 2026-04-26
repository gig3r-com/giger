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
            var senderUser = await _userService.GetByUserNameAsync(newLog.SourceUser);
            if (senderUser is null)
            {
                return BadRequest();
            }

            var senderSubnetwork = await _networksService.GetSubnetworkByFirstNameAsync(senderUser.Subnetwork);
            if (senderSubnetwork is null)
            {
                return NotFound();
            }

            newLog.Timestamp = GigerDateTime.Now;
            _logService.CreateAsync(newLog);

            if (newLog.TargetUser is not null)
            {
                var targetUser = await _userService.GetAsync(newLog.TargetUser);
                if (targetUser is not null)
                {
                    var targetSubnetwork = await _networksService.GetSubnetworkByFirstNameAsync(targetUser.Subnetwork);
                    if (targetSubnetwork.Id != senderSubnetwork.Id)
                    {
                        var copyLog = new Log(newLog, targetSubnetwork);
                        _logService.CreateAsync(copyLog);
                    }
                }
            }

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
            var subNetwork = await _networksService.GetSubnetworkByFirstNameAsync(newLog.Subnetwork);

            newLog.Timestamp = GigerDateTime.Now;
            if (newLog.LogType == LogType.SUBNETWORK_SECURITY_BREACH.ToString())
            {
                subNetwork.PastHacks = [.. subNetwork.PastHacks, newLog.Timestamp.ToString()];
            }
            _networksService.UpdateSubnetworkAsync(subNetwork);
            _logService.CreateAsync(newLog);

            return CreatedAtAction(nameof(PostHack), new { id = newLog.Id }, newLog);
        }
    }
}
