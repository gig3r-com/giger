using System.Text.Json.Serialization;

namespace Giger.Models.PlotModels
{
    public class Plot
    {
        public string Id { get; set; } = string.Empty;
        
        public string Name { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        /// <summary>
        /// User handles participating in this plot
        /// </summary>
        public List<string> Users { get; set; } = [];

        public override int GetHashCode()
        {
            int hash = 19;
            hash += 3 * Id.GetHashCode();
            hash += 5 * Name.GetHashCode();
            hash += 7 * Description.GetHashCode();
            foreach (var user in Users)
            {
                hash += 11 * user.GetHashCode();
            }
            return hash;
        }
    }
}
