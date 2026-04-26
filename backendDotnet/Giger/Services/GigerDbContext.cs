using Giger.Models;
using Giger.Models.Auths;
using Giger.Models.BankingModels;
using Giger.Models.GigModels;
using Giger.Models.Hacking;
using Giger.Models.Hashes;
using Giger.Models.Logs;
using Giger.Models.MessageModels;
using Giger.Models.Networks;
using Giger.Models.Users;
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

        // Hacking
        public DbSet<HackConfig> HackConfig { get; set; }

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
        public DbSet<ProgramCodes> ProgramCodes { get; set; }

        // Users
        public DbSet<User> Users { get; set; }
        public DbSet<Plot> Plots { get; set; }
        public DbSet<RecordType> RecordTypes { get; set; }



        public GigerDbContext(DbContextOptions<GigerDbContext> options) : base(options) 
        {
        
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("hstore"); // Enable once per DB

            modelBuilder.Entity<Auth>();
            modelBuilder.Entity<Account>(entity =>
            {
                entity.Ignore(a => a.Transactions); // Explicit ignore as extra safety
            });
            modelBuilder.Entity<Transaction>();
            modelBuilder.Entity<Gig>(entity =>
            {
                entity.Ignore(a => a.Updates); // Explicit ignore as extra safety
            });
            modelBuilder.Entity<HackConfig>();
            modelBuilder.Entity<RecordsHashes>();
            modelBuilder.Entity<Log>();
            modelBuilder.Entity<Conversation>(entity =>
            {
                entity.Ignore(a => a.Messages); // Explicit ignore as extra safety
            });
            modelBuilder.Entity<Message>();
            modelBuilder.Entity<Network>(entity =>
            {
                entity.Property(n => n.Nodes).HasColumnType("hstore");
                entity.Property(n => n.Data).HasColumnType("hstore");
            });
            modelBuilder.Entity<ProgramCodes>();
            modelBuilder.Entity<Subnetwork>(entity =>
            {
                entity.Ignore(a => a.Logs); // Explicit ignore as extra safety
            });
            modelBuilder.Entity<Plot>();
            modelBuilder.Entity<RecordType>();
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(n => n.EpsilonData).HasColumnType("hstore");
            });
            modelBuilder.Entity<GigerConfig>();
        }
    }
}
