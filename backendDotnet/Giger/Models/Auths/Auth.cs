namespace Giger.Models.Auths
{
    public class Auth
    {
        public string Id { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty; // UserPublic.Handle

        public string? HackerName { get; set; } // UserPrivate.HackerName

        public string Password { get; set; } = string.Empty;
        
        public string? AuthToken { get; set; }
    }
}
