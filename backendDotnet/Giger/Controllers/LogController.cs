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

        [HttpPost("{subnetwork}")]
        public async Task<IActionResult> PostLog(string subnetworkId, Log newLog)
        {
            var subnetwork = _networksService.GetSubnetworkByIdAsync(subnetworkId);
            if (subnetwork is null)
            {
                return NotFound();
            }

            if (subnetworkId != newLog.SubnetworkId)
            {
                return BadRequest("Mismtached subnetwork ID");
            }

            newLog.Id = ObjectId.GenerateNewId().ToString();
            await _logService.CreateAsync(newLog);

            return CreatedAtAction(nameof(PostLog), new { id = newLog.Id }, newLog);
        }

        [HttpPost("{subnetworkId}/hack")]
        public async Task<IActionResult> PostHack(string subnetworkId, Log newLog)
        {
            var subnetwork = await _networksService.GetSubnetworkByIdAsync(subnetworkId);
            if (subnetwork is null)
            {
                return NotFound();
            }

            if (subnetworkId != newLog.SubnetworkId)
            {
                return BadRequest("Mismtached subnetwork ID");
            }

            newLog.Id = ObjectId.GenerateNewId().ToString();
            subnetwork.PastHacks = [.. subnetwork.PastHacks, newLog.Id];

            _networksService.UpdateSubnetworkAsync(subnetworkId, subnetwork);
            _logService.CreateAsync(newLog);

            return CreatedAtAction(nameof(PostLog), new { id = newLog.Id }, newLog);
        }
    }
}
