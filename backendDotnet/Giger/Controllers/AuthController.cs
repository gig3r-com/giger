using Giger.Models.User;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    public abstract class AuthController(UserService userService, LoginService loginService) : Controller
    {
        protected readonly LoginService _loginService = loginService;
        protected readonly UserService _userService = userService;

        // TODO: For testing purposes only
        public static bool AuthEnabled { get; set; } = true;

        protected bool IsAuthorized(string id, short minimumHackingLevel = 1)
        {
#if DEBUG
            if (!AuthEnabled)
                return true;
#endif
            // map - user to token - check token
            // db - add table user id with passwords
            // research - try OAuth
            // else on login create token and send it back
            // login controller
            // localhost:5000/api/login?username=...&password=...


            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            if (string.IsNullOrEmpty(senderAuthToken))
                return false;

            var senderHandle = _loginService.GetByAuthTokenAsync(senderAuthToken).Result?.Username;
            if (string.IsNullOrEmpty(senderHandle))
                return false;

            var senderUser = _userService.GetByUserNameAsync(senderHandle).Result;

            if (senderUser != null)
            {
                if (senderUser.Id == id)
                    return true;

                if (senderUser.Roles != null)
                {
                    if (senderUser.Roles.Contains(UserRoles.GOD))
                        return true;

                    if (senderUser.Roles.Contains(UserRoles.ADMIN)) // TODO perform additional checks
                        return true;
                }

                if (senderUser.HackingSkills.Stat >= minimumHackingLevel)
                    return true;
            }

            return false;
        }
    }
}
