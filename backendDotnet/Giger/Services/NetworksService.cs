using Giger.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Giger.Models.Networks;

namespace Giger.Services
{
    public class NetworksService : AbstractService
    {
        private readonly IMongoCollection<Network> _networksCollection;
        private readonly IMongoCollection<Subnetwork> _subnetworksCollection;

        public NetworksService(IOptions<GigerDbSettings> gigerDatabaseSettings) : base(gigerDatabaseSettings)
        {
            _networksCollection = _mongoDatabase.GetCollection<Network>(
                gigerDatabaseSettings.Value.NetworksCollectionName);

            _subnetworksCollection = _mongoDatabase.GetCollection<Subnetwork>(
                gigerDatabaseSettings.Value.SubnetworksCollectionName);
        }

        #region Network
        public async Task<List<Network>> GetAllNetworksAsync() =>
            await _networksCollection.Find(network => true).ToListAsync();

        public async Task<Network> GetNetworkByIdAsync(string id) =>
            await _networksCollection.Find(network => network.Id == id).FirstOrDefaultAsync();

        public async Task<Network> GetNetworkByNameAsync(string name) =>
            await _networksCollection.Find(network => network.Name == name).FirstOrDefaultAsync();

        public async Task CreateNetworkAsync(Network newNetwork) =>
            await _networksCollection.InsertOneAsync(newNetwork);

        public async Task AddSubnetwork(string networkId, string subnetworkId)
        {
            var network = await GetNetworkByIdAsync(networkId);
            network.Subnetworks = [ .. network.Subnetworks, subnetworkId];
            await UpdateNetworkAsync(networkId, network);
        }

        public async Task RemoveSubnetwork(string networkId, string subnetworkId)
        {
            var network = await GetNetworkByIdAsync(networkId);
            network.Subnetworks = network.Subnetworks.Except([subnetworkId]).ToArray();
            await UpdateNetworkAsync(networkId, network);
        }

        public async Task UpdateNetworkAsync(string id, Network updatedNetwork) =>
            await _networksCollection.ReplaceOneAsync(network => network.Id == id, updatedNetwork);

        public async Task DeleteNetworkAsync(string id) =>
            await _networksCollection.DeleteOneAsync(network => network.Id == id);
        #endregion

        #region Subnetwork
        public async Task<List<Subnetwork>> GetAllSubnetworksAsync() =>
            await _subnetworksCollection.Find(subnetwork => true).ToListAsync();

        public async Task<Subnetwork> GetSubnetworkByIdAsync(string id) =>
            await _subnetworksCollection.Find(network => network.Id == id).FirstOrDefaultAsync();

        public async Task<Subnetwork> GetSubnetworkByFirstNameAsync(string name) =>
            await _subnetworksCollection.Find(network => network.Name == name).FirstOrDefaultAsync();

        public async Task CreateSubnetworkAsync(Subnetwork newSubnetwork) =>
            await _subnetworksCollection.InsertOneAsync(newSubnetwork);

        public async Task UpdateSubnetworkAsync(string id, Subnetwork updatedSubnetwork) =>
            await _subnetworksCollection.ReplaceOneAsync(network => network.Id == id, updatedSubnetwork);

        public async Task DeleteSubnetworkAsync(string id) =>
            await _networksCollection.DeleteOneAsync(network => network.Id == id);
        #endregion
    }
}
