using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class LeaderboardRepository : ILeaderboardRepository
    {
        private readonly GameDbContext _context;

        public LeaderboardRepository(GameDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddEntryAsync(Leaderboard entry)
        {
            _context.Leaderboards.Add(entry);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Leaderboard>> GetTopEntriesAsync(int count, string? difficulty = null)
        {
            var query = _context.Leaderboards.AsQueryable();
            
            if (!string.IsNullOrEmpty(difficulty))
            {
                query = query.Where(l => l.GameDifficulty == difficulty);
            }

            return await query
                .OrderBy(l => l.CompletionTime)
                .Take(count)
                .ToListAsync();
        }

        public async Task<List<Leaderboard>> GetPlayerEntriesAsync(string playerName)
        {
            return await _context.Leaderboards
                .Where(l => l.PlayerName == playerName)
                .OrderBy(l => l.CompletionTime)
                .ToListAsync();
        }
    }
}
