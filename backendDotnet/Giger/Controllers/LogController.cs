using Giger.Models.Logs;
using Giger.Models.Networks;
using Giger.Models.User;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogController(UserService userService, LoginService loginService, LogService logService) : AuthController(userService, loginService)
    {
        private readonly LogService _logService = logService;

        [HttpGet("{subnetworkId}/all")]
        public async Task<List<Log>> GetAllSubnetworkLogs(string subnetworkId) => await _logService.GetAllForSubnetworkAsync(subnetworkId);
    }
}
