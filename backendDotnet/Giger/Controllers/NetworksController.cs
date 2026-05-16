using Giger.Models.Networks;
using Giger.Models.Users;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NetworksController(UserService userService, LoginService loginService,
        NetworksService _networkService) 
        : AuthController(userService, loginService)
    {
        #region Networks
        [HttpGet("network")]
        public async Task<ActionResult<Network>> GetNetwork(string id)
        {
            var network = await _networkService.GetNetworkByIdAsync(id);
            if (!IsAuthorized(network?.Admin))
            {
                return Unauthorized();
            }
            return network;
        }

        [HttpGet("network/name")]
        public async Task<ActionResult<string>> GetNetworkName(string id)
        {
            var network = await _networkService.GetNetworkByIdAsync(id);
            if (!IsAuthorized(network?.Admin))
            {
                return Unauthorized();
            }
            return network.Name;
        }

        #endregion

        #region Subnetworks
        [HttpGet("subnetwork/all")]
        public async Task<List<Subnetwork>> GetSubnetworks()
        {
            return await _networkService.GetAllSubnetworksAsync();
        }

        [HttpPost("subnetwork")]
        public async Task<IActionResult> PostSubnetwork(Subnetwork newSubnetwork)
        {
            var network = await _networkService.GetNetworkByNameAsync(newSubnetwork.Network);
            if (!IsAuthorized(network?.Admin))
            {
                return Unauthorized();
            }
            await _networkService.CreateSubnetworkAsync(newSubnetwork);
            return CreatedAtAction(nameof(PostSubnetwork), new { id = newSubnetwork.Id }, newSubnetwork);
        }

        [HttpPatch("subnetwork/firewall")]
        public async Task<IActionResult> ChangeFirewall(string subnetworkId, string firewall)
        {

            var result = await ValidateSubnetworkRequest(subnetworkId);
            if (result.Result is not OkResult)
            {
                return result.Result;
            }

            var subnetwork = result.Subnetwork;
            subnetwork.Firewall = firewall;
            await _networkService.UpdateSubnetworkAsync(subnetwork);
            return Ok();
        }

        [HttpPatch("subnetwork/os")]
        public async Task<IActionResult> ChangeOS(string subnetworkId, string os)
        {
            var result = await ValidateSubnetworkRequest(subnetworkId);
            if (result.Result is not OkResult)
            {
                return result.Result;
            }

            var subnetwork = result.Subnetwork;
            subnetwork.OperatingSystem = os;
            await _networkService.UpdateSubnetworkAsync(subnetwork);
            return Ok();
        }

        [HttpPut("subnetwork/ice")]
        public async Task<IActionResult> AddIce(string subnetworkId, string ice)
        {
            var result = await ValidateSubnetworkRequest(subnetworkId);
            if (result.Result is not OkResult)
            {
                return result.Result;
            }

            var subnetwork = result.Subnetwork;
            if (subnetwork.Ice.Contains(ice))
            {
                return BadRequest($"Subnetwork already contains {ice} ICE.");
            }
            subnetwork.Ice = [.. subnetwork.Ice, ice];
            await _networkService.UpdateSubnetworkAsync(subnetwork);
            return Ok();
        }

        [HttpDelete("subnetwork/ice")]
        public async Task<IActionResult> RemoveIce(string subnetworkId, string ice)
        {
            var result = await ValidateSubnetworkRequest(subnetworkId);
            if (result.Result is not OkResult)
            {
                return result.Result;
            }
            var subnetwork = result.Subnetwork;
            if (subnetwork.Ice.Contains(ice))
            {
                return BadRequest($"Subnetwork already contains {ice} ICE.");
            }
            subnetwork.Ice = subnetwork.Ice.Except([ice]).ToArray();
            await _networkService.UpdateSubnetworkAsync(subnetwork);
            return Ok();
        }

        //TODO: this endpoint needs to be thought through if its needed and what to return
        [HttpGet("subnetwork/user/all")]
        public async Task<ActionResult<string[]>> GetAllUsers(string subnetworkId)
        {
            var result = await ValidateSubnetworkRequest(subnetworkId);
            switch (result.Result)
            {
                case OkResult:
                    break;
                case NotFoundResult:
                    return NotFound();
                case BadRequestResult:
                    return BadRequest();
                case UnauthorizedResult:
                    return Unauthorized();
                default:
                    return BadRequest();
            }

            return result.Subnetwork.Users;
        }
        
        [HttpGet("subnetwork/user")]
        public async Task<ActionResult<User>> GetUser(string subnetworkId, string userId)
        {
            var result = await ValidateSubnetworkRequest(subnetworkId);
            switch (result.Result)
            {
                case OkResult:
                    break;
                case NotFoundResult:
                    return NotFound();
                case BadRequestResult:
                    return BadRequest();
                case UnauthorizedResult:
                    return Unauthorized();
                default:
                    return BadRequest();
            }

            var subnetwork = result.Subnetwork;
            var user = await _userService.GetAsync(userId);
            if (user is null)
            {
                return NotFound("No such user.");
            }
            if (!subnetwork.Users.Contains(userId))
            {
                return Unauthorized("No such user in this subnetwork.");
            }
            return user;
        }

        [HttpPut("subnetwork/users")]
        public async Task<IActionResult> AddUser(string subnetworkId, string userId)
        {
            var result = await ValidateSubnetworkRequest(subnetworkId);
            if (result.Result is not OkResult)
            {
                return result.Result;
            }

            var subnetwork = result.Subnetwork;
            var user = await _userService.GetAsync(userId);
            if (user is null)
            {
                return NotFound("No such user.");
            }
            if (subnetwork.Users.Contains(userId))
            {
                return Ok("This user was already in that subnetwork.");
            }
            subnetwork.Users = [.. subnetwork.Users, userId];
            await _networkService.UpdateSubnetworkAsync(subnetwork);
            return Ok();
        }

        [HttpDelete("subnetwork/user")]
        public async Task<IActionResult> RemoveUser(string subnetworkId, string userId)
        {
            var result = await ValidateSubnetworkRequest(subnetworkId);
            if (result.Result is not OkResult)
            {
                return result.Result;
            }
            var subnetwork = result.Subnetwork;
            var user = await _userService.GetAsync(userId);
            if (user is null)
            {
                return NotFound("No such user.");
            }
            if (!subnetwork.Users.Contains(userId))
            {
                return Ok();
            }
            await _networkService.UpdateSubnetworkAsync(subnetwork);
            return Ok();
        }
        #endregion

        #region HelperMethods
        private async Task<(IActionResult Result, Subnetwork? Subnetwork)> ValidateSubnetworkRequest(string subnetworkId)
        {
            var subnetwork = await _networkService.GetSubnetworkByIdAsync(subnetworkId);
            if (subnetwork is null)
            {
                return (NotFound(), null);
            }
            var network = await _networkService.GetNetworkByNameAsync(subnetwork.Network);
            if (network is null)
            {
                return (BadRequest(), null);
            }
            if (!IsAuthorized(network.Admin))
            {
                return (Unauthorized(), null);
            }

            return (Ok(), subnetwork);
        }
        #endregion
    }
}
