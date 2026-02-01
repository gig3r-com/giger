using Giger.Models.Networks;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class NetworksService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public NetworksService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        #region Network
        public async Task<List<Network>> GetAllNetworksAsync() =>
            await _dbContext.Networks.ToListAsync();

        public async Task<Network?> GetNetworkByIdAsync(string id) =>
            await _dbContext.Networks.FirstOrDefaultAsync(network => network.Id == id);

        public async Task<Network?> GetNetworkByNameAsync(string name) =>
            await _dbContext.Networks.FirstOrDefaultAsync(network => network.Name.ToLower() == name.ToLower());

        public async Task CreateNetworkAsync(Network newNetwork)
        {
            _dbContext.Networks.Add(newNetwork);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddSubnetwork(string networkId, string subnetworkId)
        {
            var network = await GetNetworkByIdAsync(networkId);
            if (network != null)
            {
                network.Subnetworks = [ .. network.Subnetworks, subnetworkId];
                await UpdateNetworkAsync(network);
            }
        }

        public async Task RemoveSubnetwork(string networkId, string subnetworkId)
        {
            var network = await GetNetworkByIdAsync(networkId);
            if (network != null)
            {
                network.Subnetworks = network.Subnetworks.Except([subnetworkId]).ToArray();
                await UpdateNetworkAsync(network);
            }
        }

        public async Task UpdateNetworkAsync(Network updatedNetwork)
        {
            _dbContext.Networks.Update(updatedNetwork);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteNetworkAsync(string id)
        {
            var network = await GetNetworkByIdAsync(id);
            if (network != null)
            {
                _dbContext.Networks.Remove(network);
                await _dbContext.SaveChangesAsync();
            }
        }
        #endregion

        #region Subnetwork
        public async Task<List<Subnetwork>> GetAllSubnetworksAsync() =>
            await _dbContext.Subnetworks.ToListAsync();

        public async Task<Subnetwork?> GetSubnetworkByIdAsync(string id) =>
            await _dbContext.Subnetworks.FirstOrDefaultAsync(network => network.Id == id);

        public async Task<Subnetwork?> GetSubnetworkByFirstNameAsync(string name) =>
            await _dbContext.Subnetworks.FirstOrDefaultAsync(network => network.Name.ToLower() == name.ToLower());

        public async Task CreateSubnetworkAsync(Subnetwork newSubnetwork)
        {
            _dbContext.Subnetworks.Add(newSubnetwork);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateSubnetworkAsync(Subnetwork updatedSubnetwork)
        {
            _dbContext.Subnetworks.Update(updatedSubnetwork);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteSubnetworkAsync(string id)
        {
            var subnetwork = await GetSubnetworkByIdAsync(id);
            if (subnetwork != null)
            {
                _dbContext.Subnetworks.Remove(subnetwork);
                await _dbContext.SaveChangesAsync();
            }
        }
        #endregion
    }
}
