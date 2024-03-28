using Giger.Models.Networks;
using Giger.Services;
using Microsoft.AspNetCore.Mvc;

namespace Giger.Controllers
{
    [ApiController]
    public class NetworksController(UserService userService, LoginService loginService,
        NetworksService networkService) : AuthController(userService, loginService)
    {
        private readonly NetworksService _networkService = networkService;

        [HttpGet("all")]
        public async Task<List<Network>> GetNetworks() => await _networkService.GetAllNetworksAsync();

        [HttpGet("subnetwork/all")]
        public async Task<List<Subnetwork>> GetSubnetworks() => await _networkService.GetAllSubnetworksAsync();

    }
}
