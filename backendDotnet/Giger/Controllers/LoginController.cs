using Giger.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly UserService _userService;  
        private readonly LoginService _loginService;

        public LoginController(UserService userService, LoginService loginService)
        {
            _loginService = loginService;
            _userService = userService;
        }

// TODO: For testing purposes only, remove in production
#if DEBUG
        [HttpGet("disableAuth")]
        public async Task<string> DisableAuth()
        {
            AuthController.AuthEnabled = false;
            return "Auth disabled";
        }

        [HttpGet("enableAuth")]
        public async Task<string> EnableAuth()
        {
            AuthController.AuthEnabled = true;
            return "Auth enabled";
        }
#endif

        [AllowAnonymous]
        [HttpGet("giger")]
        public async Task<string> Login(string userName, string password)
        {
            var userLoginData = await _loginService.GetByUserNameAsync(userName);
            if (userLoginData == null)
            {
                Response.StatusCode = StatusCodes.Status404NotFound;
                return "User not found";
            }
            if (userLoginData.Password != password)
            {
                Response.StatusCode = StatusCodes.Status401Unauthorized;
                return "Wrong password";
            }

            var user = await _userService.GetByUserNameAsync(userName);
            if (user != null && user.Roles.Contains(Models.User.UserRoles.ADMIN))
            {
                if (userLoginData.AuthToken != null)
                {
                    Response.StatusCode = StatusCodes.Status200OK;
                    return userLoginData.AuthToken;
                }
            }

            var newAuthToken = Guid.NewGuid().ToString();
            while (_loginService.GetByAuthTokenAsync(newAuthToken) != null)
            {
                newAuthToken = Guid.NewGuid().ToString();
            }
            userLoginData.AuthToken = newAuthToken;

            await _loginService.UpdateAsync(userLoginData);
            Response.StatusCode = StatusCodes.Status200OK;
            return userLoginData.AuthToken;
        }

        [HttpGet("hacker")]
        public async Task<string> LoginHacker(string userName, string password)
        {
            var userLoginData = await _loginService.GetByUserNameAsync(userName);
            if (userLoginData == null)
            {
                Response.StatusCode = StatusCodes.Status404NotFound;
                return "User not found";
            }
            if (userLoginData.Password != password)
            {
                Response.StatusCode = StatusCodes.Status401Unauthorized;
                return "Wrong password";
            }

            var user = await _userService.GetByUserNameAsync(userName);
            if (user != null && (user.Roles.Contains(Models.User.UserRoles.ADMIN) ||
                user.HackingSkills.Stat >= 1))
            {
                if (userLoginData.AuthToken != null)
                {
                    Response.StatusCode = StatusCodes.Status200OK;
                    return userLoginData.AuthToken;
                }
                else
                {
                    Response.StatusCode = StatusCodes.Status400BadRequest;
                    return "Please login to Gig3r first";
                }
            }
            Response.StatusCode = StatusCodes.Status401Unauthorized;
            return "You are not authorized to use this service";
        }

        [HttpGet("logout")]
        public async Task<string> Logout(string userName)
        {
            Request.Headers.TryGetValue("AuthToken", out var authToken);
            var userLoginData = await _loginService.GetByUserNameAsync(userName);
            if (userLoginData == null)
            {
                Response.StatusCode = StatusCodes.Status404NotFound;
                return "User not found";
            }
            if (userLoginData.AuthToken != authToken)
            {
                Response.StatusCode = StatusCodes.Status401Unauthorized;
                return "Wrong token";
            }
            userLoginData.AuthToken = null;
            await _loginService.UpdateAsync(userLoginData);
            Response.StatusCode = StatusCodes.Status200OK;
            return "Logged out";
        }

        [HttpGet("changePassword")]
        public async Task<string> ChangePassword(string userName, string oldPassword, string newPassword)
        {
            var userLoginData = await _loginService.GetByUserNameAsync(userName);
            if (userLoginData == null)
            {
                Response.StatusCode = StatusCodes.Status404NotFound;
                return "User not found";
            }
            if (userLoginData.Password != oldPassword)
            {
                Response.StatusCode = StatusCodes.Status401Unauthorized;
                return "Wrong password";
            }
            if (userLoginData.Password == newPassword)
            {
                Response.StatusCode = StatusCodes.Status400BadRequest;
                return "New password is the same as the old one";
            }
            userLoginData.Password = newPassword;
            await _loginService.UpdateAsync(userLoginData);
            Response.StatusCode = StatusCodes.Status200OK;
            return "Password changed";
        }
    }
}
