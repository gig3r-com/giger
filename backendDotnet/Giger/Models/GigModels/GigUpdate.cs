using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.GigModels
{
    public class GigUpdate
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public required string GigId { get; set; }
        [ForeignKey("GigId")]
        public Gig? Gig { get; set; }

        public required string From { get; set; } // previous status

        public required string To { get; set; } // next status

        public required DateTime Date { get; set; }

        public required string SourceHandle { get; set; } // handle of user that initiated status change
    }
}
