using Giger.Models.GigModels;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class GigService
    {
        private readonly GigerDbContext _dbContext;

        public GigService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Gig>> GetAllAsync() =>
            await _dbContext.Gigs.ToListAsync();

        public async Task<List<Gig>> GetAllVisibleToUserAsync(string requestSenderId) =>
            await _dbContext.Gigs
                .Where(g => g.Status == GigStatus.AVAILABLE ||
                            g.TakenById == requestSenderId || g.AuthorId == requestSenderId)
                .ToListAsync();

        public async Task<List<Gig>> GetAllVisibleToModeratorAsync(string requestSenderId) =>
            await _dbContext.Gigs
                .Where(g => g.Status == GigStatus.AVAILABLE || g.Status == GigStatus.DISPUTE ||
                            g.TakenById == requestSenderId || g.AuthorId == requestSenderId)
                .ToListAsync();

        public async Task<List<Gig>> GetAllOwnAsync(string userId) =>
            await _dbContext.Gigs
                .Where(g => g.TakenById == userId || g.AuthorId == userId)
                .ToListAsync();

        public async Task<Gig?> GetAsync(string id) =>
            await _dbContext.Gigs.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<long> GetLimitedUserGigsCountAsync(string takenBy) =>
            await _dbContext.Gigs
                .Where(x => x.TakenById == takenBy && x.Mode == GigModes.CLIENT &&
                    (x.Status == GigStatus.IN_PROGRESS || x.Status == GigStatus.DISPUTE))
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
