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
        public static bool AuthEnabled { get; set; } = false;

        protected bool IsAuthorized(string ownerId = "", short minimumHackingLevel = 1)
        {
#if DEBUG
            if (!AuthEnabled)
                return true;
#endif
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            if (string.IsNullOrEmpty(senderAuthToken))
                return false;

            var senderHandle = _loginService.GetByAuthTokenAsync(senderAuthToken).Result?.Username;
            if (string.IsNullOrEmpty(senderHandle))
                return false;

            var senderUser = _userService.GetByUserNameAsync(senderHandle).Result;

            if (senderUser != null)
            {
                if (senderUser.Id == ownerId)
                    return true;

                if (senderUser.Roles.Contains(UserRoles.GOD))
                    return true;

                if (senderUser.Roles.Contains(UserRoles.ADMIN)) // TODO perform additional checks
                    return true;

                if (senderUser.HackingSkills.Stat >= minimumHackingLevel)
                    return true;
            }

            return false;
        }

        protected bool IsRole(UserRoles allowedRole)
        {
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            if (string.IsNullOrEmpty(senderAuthToken))
                return false;

            var senderHandle = _loginService.GetByAuthTokenAsync(senderAuthToken).Result?.Username;
            if (string.IsNullOrEmpty(senderHandle))
                return false;

            var senderUser = _userService.GetByUserNameAsync(senderHandle).Result;
            if (senderUser != null)
            {
                if (senderUser.Roles.Contains(allowedRole))
                    return true;

                if (senderUser.Roles.Contains(UserRoles.GOD))
                    return true;
            }

            return false;
        }

        protected bool IsGodUser()
        {
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            if (string.IsNullOrEmpty(senderAuthToken))
                return false;

            var senderHandle = _loginService.GetByAuthTokenAsync(senderAuthToken).Result?.Username;
            if (string.IsNullOrEmpty(senderHandle))
                return false;

            var senderUser = _userService.GetByUserNameAsync(senderHandle).Result;

            var isGodUser = senderUser?.Roles.Contains(UserRoles.GOD);
            if (isGodUser.HasValue && isGodUser.Value)
                return true;

            return false;
        }
    }
}
