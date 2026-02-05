using System.ComponentModel.DataAnnotations;

namespace Giger.Models.Plots
{
    public class Plot
    {
        [Key]
        public required string Id { get; set; }

        public required string Name { get; set; }

        public string? Description { get; set; }

        // Navigation: users via junction
        public List<PlotUser> PlotUsers { get; set; } = [];
    }
}
