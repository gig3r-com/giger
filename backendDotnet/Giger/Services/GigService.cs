using Giger.Models.GigModels;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class GigService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public GigService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Gig>> GetAllAsync() =>
            await _dbContext.Gigs
                .Include(g => g.IsRevealedTo)
                .Include(g => g.Updates)
                .ToListAsync();

        public async Task<List<Gig>> GetAllVisibleToUserAsync(string requestSenderId) =>
            await _dbContext.Gigs
                .Include(g => g.IsRevealedTo)
                .Include(g => g.Updates)
                .Where(g => g.Status == "AVAILABLE" ||
                            g.WorkerId == requestSenderId || g.AuthorId == requestSenderId)
                .ToListAsync();

        public async Task<List<Gig>> GetAllVisibleToModeratorAsync(string requestSenderId) =>
            await _dbContext.Gigs
                .Include(g => g.IsRevealedTo)
                .Include(g => g.Updates)
                .Where(g => g.Status == "AVAILABLE" || g.Status == "DISPUTE" ||
                            g.WorkerId == requestSenderId || g.AuthorId == requestSenderId)
                .ToListAsync();

        public async Task<List<Gig>> GetAllOwnAsync(string userId) =>
            await _dbContext.Gigs
                .Include(g => g.IsRevealedTo)
                .Include(g => g.Updates)
                .Where(g => g.WorkerId == userId || g.AuthorId == userId)
                .ToListAsync();

        public async Task<Gig?> GetAsync(string id) =>
            await _dbContext.Gigs
                .Include(g => g.IsRevealedTo)
                .Include(g => g.Updates)
                .FirstOrDefaultAsync(x => x.Id == id);

        public async Task<long> GetLimitedUserGigsCountAsync(string workerId) =>
            await _dbContext.Gigs
                .Where(x => x.WorkerId == workerId && x.Mode == "authorIsHiring" &&
                    (x.Status == "IN_PROGRESS" || x.Status == "DISPUTE"))
                .LongCountAsync();

        public async Task<Gig?> GetByFirstNameAsync(string title) =>
            await _dbContext.Gigs.FirstOrDefaultAsync(x => x.Title == title);

        public async Task CreateAsync(Gig newGig)
        {
            _dbContext.Gigs.Add(newGig);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Gig updatedGig)
        {
            _dbContext.Gigs.Update(updatedGig);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var gig = await GetAsync(id);
            if (gig != null)
            {
                _dbContext.Gigs.Remove(gig);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
