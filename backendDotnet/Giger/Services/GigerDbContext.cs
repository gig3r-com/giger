using Giger.Models.Auths;
using Giger.Models.BankingModels;
using Giger.Models.EventModels;
using Giger.Models.GigModels;
using Giger.Models.Hacking;
using Giger.Models.Hashes;
using Giger.Models.Logs;
using Giger.Models.MessageModels;
using Giger.Models.Networks;
using Giger.Models.Obscured;
using Giger.Models.User;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class GigerDbContext : DbContext
    {
        // Auths
        public DbSet<Auth> Auths { get; set; }

        // Banking Models
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        // Gig Models
        public DbSet<Gig> Gigs { get; set; }
        public DbSet<CriminalEvent> CriminalEvents { get; set; }
        public DbSet<MedicalEvent> MedicalEvents { get; set; }

        // Hacking
        public DbSet<HackConfig> HackConfig { get; set; }
        public DbSet<ProgramCodes> ProgramCodes { get; set; }

        // Hashes
        public DbSet<RecordsHashes> RecordsHashes { get; set; }
        public DbSet<UpdateHashes> UpdateHashes { get; set; }

        // Logs
        public DbSet<Log> Logs { get; set; }

        // Message Models
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }

        // Networks
        public DbSet<Network> Networks { get; set; }
        public DbSet<Subnetwork> Subnetworks { get; set; }

        // Obscured
        public DbSet<ObscurableInfo> ObscurableInfos { get; set; }
        public DbSet<ObscuredCodesMap> ObscuredCodesMap { get; set; }

        // User
        public DbSet<AnonymizedUser> AnonymizedUsers { get; set; }
        public DbSet<UserPrivate> Users { get; set; }
        public DbSet<UserPublic> UsersPublic { get; set; }
        public DbSet<UserSimple> UsersSimple { get; set; }
        // Add other DbSet<T> as needed

        public GigerDbContext(DbContextOptions<GigerDbContext> options) : base(options) 
        {
            new AccountService(this);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Optional: configure relationships, keys, table names, etc.
        }
    }
}
