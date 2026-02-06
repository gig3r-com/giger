namespace Giger.DTOs
{
    public class AccountDTO
    {
        public string Id { get; set; } = "";
        public string Type { get; set; } = "";
        public string AccountNumber { get; set; } = "";
        public decimal Balance { get; set; }
        public string Owner { get; set; } = "";
        public List<TransactionDTO> Transactions { get; set; } = new();
    }

    public class TransactionDTO
    {
        public string Id { get; set; } = "";
        public string From { get; set; } = "";
        public string To { get; set; } = "";
        public string FromUser { get; set; } = "";
        public string ToUser { get; set; } = "";
        public decimal Amount { get; set; }
        public string Timestamp { get; set; } = "";
        public string? Title { get; set; }
        public string? OrderingParty { get; set; }
    }
}
