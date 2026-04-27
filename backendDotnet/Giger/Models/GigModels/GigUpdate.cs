using System.Text.Json.Serialization;

namespace Giger.Models.GigModels
{
    public class GigUpdate
    {
        public string Id { get; set; }
        public string From { get; set; } // previous status
        public string To { get; set; } // new status
        public DateTime Date { get; set; }
        public string SourceHandlle { get; set; } // handle of a user that initiated changing of a status

        [JsonIgnore] // Kept in DB, hidden from API responses
        public string GigFK { get; set; }
    }
}
