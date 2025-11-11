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
        [HttpGet("{subnetworkId}/all")]
        public async Task<List<Log>> GetAllSubnetworkLogs(string subnetworkId) => await _logService.GetAllForSubnetworkAsync(subnetworkId);

        [HttpPost()]
        public async Task<IActionResult> PostLog(Log newLog)
        {
            var senderUser = await _userService.GetAsync(newLog.SourceUserId);
            if (senderUser is null)
            {
                return BadRequest();
            }

            var senderSubnetwork = await _networksService.GetSubnetworkByIdAsync(senderUser.SubnetworkId);
            if (senderSubnetwork is null)
            {
                return NotFound();
            }

            newLog.Timestamp = GigerDateTime.Now;
            _logService.CreateAsync(newLog);

            if (newLog.TargetUserId is not null)
            {
                var targetUser = await _userService.GetAsync(newLog.TargetUserId);
                if (targetUser is not null)
                {
                    var targetSubnetwork = await _networksService.GetSubnetworkByIdAsync(targetUser.SubnetworkId);
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
            var subNetwork = await _networksService.GetSubnetworkByIdAsync(newLog.SubnetworkId);

            newLog.Timestamp = GigerDateTime.Now;
            if (newLog.LogType == LogType.SUBNETWORK_SECURITY_BREACH)
            {
                subNetwork.PastHacks = [.. subNetwork.PastHacks, newLog.Timestamp.ToString()];
            }
            _networksService.UpdateSubnetworkAsync(subNetwork);
            _logService.CreateAsync(newLog);

            return CreatedAtAction(nameof(PostHack), new { id = newLog.Id }, newLog);
        }
    }
}
