using Giger.Models.Logs;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogController(UserService userService, LoginService loginService, LogService logService, NetworksService networksService) 
        : AuthController(userService, loginService)
    {
        private readonly LogService _logService = logService;
        private readonly NetworksService _networksService = networksService;

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

            newLog.Id = ObjectId.GenerateNewId().ToString();
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

            await _logService.UpdateAsync(updatedLog.Id, updatedLog);
            return Ok();
        }

        [HttpPost("hack")]
        public async Task<IActionResult> PostHack(Log newLog)
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

            newLog.Id = ObjectId.GenerateNewId().ToString();
            newLog.Timestamp = GigerDateTime.Now;
            senderSubnetwork.PastHacks = [.. senderSubnetwork.PastHacks, newLog.Id];
            _networksService.UpdateSubnetworkAsync(senderSubnetwork.Id, senderSubnetwork);
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
                        targetSubnetwork.PastHacks = [.. targetSubnetwork.PastHacks, copyLog.Id];
                        _networksService.UpdateSubnetworkAsync(targetSubnetwork.Id, targetSubnetwork);
                        _logService.CreateAsync(copyLog);
                    }
                }
            }

            return CreatedAtAction(nameof(PostHack), new { id = newLog.Id }, newLog);
        }
    }
}
