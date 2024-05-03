namespace Giger.Controllers
{
    public class Messages
    {
        public const string AUTH_TOKEN_EXPIRED = "User authentication token expired"; 
        public const string GIG_NOT_FOUND = "No gig found with that ID";
        public const string GIG_NOT_FOUND_CONVERSATION = "Gig has no conversation";
        public const string GIG_ALREADY_TAKEN = "Gig is already taken";
        public const string GIG_RESERVE_FUNDS_TRANSACTION_TITLE = "Reserving funds for gig '{0}' payment.";
        public const string GIG_TAX_TRANSACTION_TITLE = "Tax for gig '{0}'.";
        public const string GIG_REFUND_TRANSACTION_TITLE = "Returning reserved funds for gig '{0}' payment.";
        public const string GIG_DISPUTE_FEE_TITLE = "Payment for gig resolving dispute over '{0}' gig.";
        public const string GIG_PAYMENT_TITLE = "Payment for gig '{0}'";
        public const string ACCOUNT_INSUFFICIENT_FUNDS = "Insufficient funds.";
        public const string ACCOUNT_NOT_FOUND = "No such account found.";
    }
}
