using System.Text.Json.Serialization;

namespace Giger.Models.User
{
    public class AnonymizedUser
    {
        public string Id { get; set; } = string.Empty;

        public string UserId { get; set; } = string.Empty;

        public string DisplyedAs { get; set; } = string.Empty;
    }
}
