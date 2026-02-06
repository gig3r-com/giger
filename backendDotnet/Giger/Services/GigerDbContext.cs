using Giger.Models.Auths;
using Giger.Models.BankingModels;
using Giger.Models.GigModels;
using Giger.Models.Hacking;
using Giger.Models.Logs;
using Giger.Models.MessageModels;
using Giger.Models.Networks;
using Giger.Models.Plots;
using Giger.Models.User;
using Giger.Models;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class GigerDbContext : DbContext
    {
        // Auths
        public DbSet<Auth> Auths { get; set; }

        // Banking
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<AccountOwner> AccountOwners { get; set; }

        // Gigs
        public DbSet<Gig> Gigs { get; set; }
        public DbSet<GigUpdate> GigUpdates { get; set; }
        public DbSet<GigRevealedTo> GigRevealedTo { get; set; }

        // Hacking
        public DbSet<ProgramCodes> ProgramCodes { get; set; }

        // Logs
        public DbSet<Log> Logs { get; set; }

        // Messages
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<ConversationParticipant> ConversationParticipants { get; set; }
        public DbSet<ConversationAnonymizedUser> ConversationAnonymizedUsers { get; set; }
        public DbSet<ConversationHacker> ConversationHackers { get; set; }
        public DbSet<MessageReadBy> MessageReadBys { get; set; }

        // Networks
        public DbSet<Network> Networks { get; set; }
        public DbSet<Subnetwork> Subnetworks { get; set; }
        public DbSet<SubnetworkUser> SubnetworkUsers { get; set; }

        // Plots
        public DbSet<Plot> Plots { get; set; }
        public DbSet<PlotUser> PlotUsers { get; set; }

        // Users
        public DbSet<User> Users { get; set; }
        public DbSet<RecordType> Records { get; set; }
        public DbSet<UserFavoriteUser> UserFavoriteUsers { get; set; }
        public DbSet<UserEpsilonConversationNote> UserEpsilonConversationNotes { get; set; }

        // Config
        public DbSet<GigerConfig> GigerConfigs { get; set; }

        public GigerDbContext(DbContextOptions<GigerDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Auth>();
            modelBuilder.Entity<GigerConfig>();

            // Account
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasMany(a => a.Transactions).WithOne(t => t.Account).HasForeignKey(t => t.AccountId);
                entity.HasMany(a => a.Owners).WithOne(o => o.Account).HasForeignKey(o => o.AccountId);
            });

            modelBuilder.Entity<AccountOwner>(entity =>
            {
                entity.HasKey(ao => new { ao.AccountId, ao.UserHandle });
            });

            // Conversation
            modelBuilder.Entity<Conversation>(entity =>
            {
                entity.HasMany(c => c.Messages).WithOne(m => m.Conversation).HasForeignKey(m => m.ConversationId);
                entity.HasMany(c => c.Participants).WithOne(p => p.Conversation).HasForeignKey(p => p.ConversationId);
                entity.HasMany(c => c.AnonymizedUsers).WithOne(a => a.Conversation).HasForeignKey(a => a.ConversationId);
                entity.HasMany(c => c.Hackers).WithOne(h => h.Conversation).HasForeignKey(h => h.ConversationId);
            });

            modelBuilder.Entity<ConversationParticipant>(entity =>
            {
                entity.HasKey(cp => new { cp.ConversationId, cp.UserHandle });
            });

            modelBuilder.Entity<ConversationAnonymizedUser>(entity =>
            {
                entity.HasKey(ca => new { ca.ConversationId, ca.UserHandle });
            });

            modelBuilder.Entity<ConversationHacker>(entity =>
            {
                entity.HasKey(ch => new { ch.ConversationId, ch.UserHandle });
            });

            // Message
            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasMany(m => m.ReadBy).WithOne(r => r.Message).HasForeignKey(r => r.MessageId);
            });

            modelBuilder.Entity<MessageReadBy>(entity =>
            {
                entity.HasKey(mr => new { mr.MessageId, mr.UserHandle });
            });

            // Network/Subnetwork
            modelBuilder.Entity<Subnetwork>(entity =>
            {
                entity.HasMany(s => s.Users).WithOne(u => u.Subnetwork).HasForeignKey(u => u.SubnetworkId);
            });

            modelBuilder.Entity<SubnetworkUser>(entity =>
            {
                entity.HasKey(su => new { su.SubnetworkId, su.UserHandle });
            });

            // Gig
            modelBuilder.Entity<Gig>(entity =>
            {
                entity.HasMany(g => g.IsRevealedTo).WithOne(r => r.Gig).HasForeignKey(r => r.GigId);
                entity.HasMany(g => g.Updates).WithOne(u => u.Gig).HasForeignKey(u => u.GigId);
            });

            modelBuilder.Entity<GigRevealedTo>(entity =>
            {
                entity.HasKey(gr => new { gr.GigId, gr.UserHandle });
            });

            // Plot
            modelBuilder.Entity<Plot>(entity =>
            {
                entity.HasMany(p => p.PlotUsers).WithOne(pu => pu.Plot).HasForeignKey(pu => pu.PlotId);
            });

            modelBuilder.Entity<PlotUser>(entity =>
            {
                entity.HasKey(pu => new { pu.PlotId, pu.UserId });
            });

            // User
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasMany(u => u.FavoriteUsers).WithOne(f => f.User).HasForeignKey(f => f.UserId);
                entity.HasMany(u => u.Records).WithOne(r => r.User).HasForeignKey(r => r.UserId);
                entity.HasMany(u => u.EpsilonConversationsNotes).WithOne(e => e.User).HasForeignKey(e => e.UserId);
            });

            modelBuilder.Entity<UserFavoriteUser>(entity =>
            {
                entity.HasKey(uf => new { uf.UserId, uf.FavoriteUserHandle });
            });
        }
    }
}
