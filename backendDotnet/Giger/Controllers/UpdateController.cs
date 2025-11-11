using Giger.Connections.Handlers;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    //[ApiController]
    [Route("api/[controller]")]
    public class UpdateController(UserService userService, LoginService loginService, NotificationsSocketHandler notificationsSocketHandler) 
        : AuthController(userService, loginService)
    {
        private NotificationsSocketHandler _notificationsSocketHandler = notificationsSocketHandler;

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            if (!IsGodUser())
            {
                return Unauthorized();
            }

            await _notificationsSocketHandler.NotifyUpdate();
            return Ok();
        }
    }
}
