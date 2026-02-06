using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.GigModels
{
    public class GigRevealedTo
    {
        public required string GigId { get; set; }
        [ForeignKey("GigId")]
        public Gig? Gig { get; set; }

        public required string UserHandle { get; set; }
    }
}
