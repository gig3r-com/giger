using System.ComponentModel.DataAnnotations.Schema;

namespace Giger.Models.Plots
{
    public class PlotUser
    {
        public required string PlotId { get; set; }
        [ForeignKey("PlotId")]
        public Plot? Plot { get; set; }

        public required string UserId { get; set; }
    }
}
