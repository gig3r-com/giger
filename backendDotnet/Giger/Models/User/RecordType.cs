namespace Giger.Models.Users
{
    public class RecordType
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string User { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string Title { get; set; }
        public string Data { get; set; }
        public DateTime Timestamp { get; set; }
        public bool IsRevealed { get; set; }
        public string RevealCode { get; set; }
        public bool IsEncrypted { get; set; }
        public string EncryptionCode { get; set; }
        public string HackData { get; set; }

        public enum Types
        {
            HARDRECORD,
            OFFGAMERECORD,
            MINDRECORD
        }
    }
}
