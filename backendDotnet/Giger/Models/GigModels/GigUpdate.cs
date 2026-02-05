using System.Text.Json.Serialization;

namespace Giger.Models.GigModels
{
    public class GigUpdate
    {
        public string Id { get; set; } = string.Empty;
        
        /// <summary>
        /// Previous status
        /// </summary>
        public string From { get; set; } = string.Empty;
        
        /// <summary>
        /// Next status
        /// </summary>
        public string To { get; set; } = string.Empty;
        
        public DateTime Date { get; set; }
        
        /// <summary>
        /// Handle of the user that initiated the status change
        /// </summary>
        public string SourceHandle { get; set; } = string.Empty;

        public override int GetHashCode()
        {
            int hash = 19;
            hash += 3 * Id.GetHashCode();
            hash += 5 * From.GetHashCode();
            hash += 7 * To.GetHashCode();
            hash += 11 * Date.GetHashCode();
            hash += 13 * SourceHandle.GetHashCode();
            return hash;
        }
    }
}
