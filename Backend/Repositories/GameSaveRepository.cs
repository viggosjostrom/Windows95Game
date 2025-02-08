using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class GameSaveRepository : IGameSaveRepository
    {
        private readonly GameDbContext _context;

        public GameSaveRepository(GameDbContext context)
        {
            _context = context;
        }

        public async Task<GameSave?> GetByPlayerNameAsync(string playerName)
        {
            return await _context.GameSaves.FirstOrDefaultAsync(g => g.PlayerName == playerName);
        }

        public async Task<bool> SaveAsync(GameSave gameSave)
        {
            _context.GameSaves.Add(gameSave);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateAsync(GameSave gameSave)
        {
            _context.GameSaves.Update(gameSave);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
