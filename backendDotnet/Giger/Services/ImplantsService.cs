using Giger.Models.EventModels;
using Microsoft.EntityFrameworkCore;

namespace Giger.Services
{
    public class ImplantsService : IGigerService
    {
        private readonly GigerDbContext _dbContext;

        public ImplantsService(GigerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MedicalEvent>> GetAllAsync() =>
            await _dbContext.MedicalEvents.ToListAsync();

        public async Task<MedicalEvent?> GetAsync(string id) =>
            await _dbContext.MedicalEvents.FirstOrDefaultAsync(i => i.Id == id);

        public async Task CreateAsync(MedicalEvent newEvent)
        {
            _dbContext.MedicalEvents.Add(newEvent);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(MedicalEvent updatedEvent)
        {
            _dbContext.MedicalEvents.Update(updatedEvent);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            var medicalEvent = await GetAsync(id);
            if (medicalEvent != null)
            {
                _dbContext.MedicalEvents.Remove(medicalEvent);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
