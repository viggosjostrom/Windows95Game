using Microsoft.EntityFrameworkCore;

public class GameDbContext : DbContext
{
    public GameDbContext(DbContextOptions<GameDbContext> options) : base(options) { }

    public DbSet<GameSave> GameSaves { get; set; }
    public DbSet<Leaderboard> Leaderboards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GameSave>().HasIndex(g => g.PlayerName).IsUnique();
        modelBuilder.Entity<Leaderboard>()
            .HasIndex(l => new { l.PlayerName, l.GameDifficulty });
    }
}
