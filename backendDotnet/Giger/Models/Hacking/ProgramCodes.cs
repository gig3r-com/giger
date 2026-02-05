using System.Text.Json.Serialization;

namespace Giger.Models.Hacking
{
    public class ProgramCodes
    {
        public string Id { get; set; } = string.Empty;

        public string ProgramCode { get; set; } = string.Empty;

        /// <summary>
        /// Human readable name of the program
        /// </summary>
        public string? Program { get; set; }

        public bool IsUsed { get; set; }

        /// <summary>
        /// Handle of the player who created this code (if player-created)
        /// </summary>
        public string? Creator { get; set; }

        /// <summary>
        /// Handle of the player who used this code (if code was used)
        /// </summary>
        public string? Owner { get; set; }
    }
}
