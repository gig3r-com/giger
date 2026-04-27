namespace Giger.Models.Networks
{
    public class ProgramCodes
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Program { get; set; }// human readable name of a program
        public bool IsUsed { get; set; }
        public string Creator { get; set; } // if code was created by player here will be his handle
        public string Owner { get; set; } // if code was used here will be who used it
    }
}
