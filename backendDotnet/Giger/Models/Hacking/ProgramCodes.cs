using System.ComponentModel.DataAnnotations;

namespace Giger.Models.Hacking
{
    public class ProgramCodes
    {
        [Key]
        public required string Id { get; set; }

        public required string Code { get; set; }

        public required string Program { get; set; } // human readable name

        public required bool IsUsed { get; set; }

        public string? Creator { get; set; } // user handle - if created by player

        public string? Owner { get; set; } // user handle - if used by someone
    }
}
