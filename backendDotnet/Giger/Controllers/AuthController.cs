using Giger.Models.User;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    public abstract class AuthController : Controller
    {
        public AuthController(UserService userService, LoginService loginService)
        {
            _loginService = loginService;
            _userService = userService;
        }
        protected LoginService _loginService;
        protected UserService _userService;

#if DEBUG
        public static bool AuthEnabled { get; set; } = false;
#endif

        protected async Task<User> GetSenderUser()
        {
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            if (string.IsNullOrEmpty(senderAuthToken))
                return null;

            var senderHandle = await _loginService.GetByAuthTokenAsync(senderAuthToken);
            if (senderHandle == null)
                return null;

            return await _userService.GetByUserNameAsync(senderHandle.Username);
        }

        protected async Task<string> GetSenderUsername()
        {
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            if (string.IsNullOrEmpty(senderAuthToken))
                return null;

            var senderHandle = await _loginService.GetByAuthTokenAsync(senderAuthToken);
            if (senderHandle == null)
                return null;

            return senderHandle.Username;
        }

        protected bool IsAuthorized(string owner = "", short minimumHackingLevel = 1)
        {
#if DEBUG
            if (!AuthEnabled)
                return true;
#endif
            if (Request == null)
            {
                return true;
            }
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            if (string.IsNullOrEmpty(senderAuthToken))
                return false;

            var senderHandle = _loginService.GetByAuthTokenAsync(senderAuthToken).Result?.Username;
            if (string.IsNullOrEmpty(senderHandle))
                return false;

            var senderUser = _userService.GetByUserNameAsync(senderHandle).Result;

            if (senderUser != null && owner != null)
            {
                if (owner == senderUser.Id || owner.Equals(senderUser.Handle, StringComparison.OrdinalIgnoreCase) ||
                    (senderUser.HackerName != null && owner.Equals(senderUser.HackerName, StringComparison.OrdinalIgnoreCase)))
                    return true;

                if (senderUser.Faction != null && owner == senderUser.Faction)
                    return true;

                if (senderUser.Roles.Contains("GOD"))
                    return true;

                if (senderUser.Roles.Contains("ADMIN"))
                    return true;

                if (senderUser.HackerSkill >= minimumHackingLevel)
                    return true;
            }

            return false;
        }

        protected bool IsAuthorizedNotHacker(string owner = "", short minimumHackingLevel = 1)
        {
#if DEBUG
            if (!AuthEnabled)
                return true;
#endif
            if (Request == null)
            {
                return true;
            }
            Request.Headers.TryGetValue("AuthToken", out var senderAuthToken);
            if (string.IsNullOrEmpty(senderAuthToken))
                return false;

            var senderHandle = _loginService.GetByAuthTokenAsync(senderAuthToken).Result?.Username;
            if (string.IsNullOrEmpty(senderHandle))
                return false;

            var senderUser = _userService.GetByUserNameAsync(senderHandle).Result;

            if (senderUser != null && owner != null)
            {
                if (owner == senderUser.Id || owner.Equals(senderUser.Handle, StringComparison.OrdinalIgnoreCase) ||
                    (senderUser.HackerName != null && owner.Equals(senderUser.HackerName, StringComparison.OrdinalIgnoreCase)))
                    return true;

                if (senderUser.Faction != null && owner == senderUser.Faction)
                    return true;

                if (senderUser.Roles.Contains("GOD"))
                    return true;

                if (senderUser.Roles.Contains("ADMIN"))
                    return true;
            }

            return false;
        }

        protected bool IsRole(string allowedRole)
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

                if (senderUser.Roles.Contains("GOD"))
                    return true;
            }

            return false;
        }

        protected bool IsGodUser()
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

            var isGodUser = senderUser?.Roles.Contains("GOD");
            if (isGodUser.HasValue && isGodUser.Value)
                return true;

            return false;
        }
    }
}
