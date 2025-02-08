/// <summary>
/// Repository for managing leaderboard entries
/// </summary>
public interface ILeaderboardRepository
{
    /// <summary>
    /// Adds a new entry to the leaderboard
    /// </summary>
    /// <param name="entry">The leaderboard entry to add</param>
    /// <returns>True if the entry was successfully added, false otherwise</returns>
    Task<bool> AddEntryAsync(Leaderboard entry);

    /// <summary>
    /// Retrieves the top entries from the leaderboard
    /// </summary>
    /// <param name="count">The number of entries to retrieve</param>
    /// <param name="difficulty">Optional difficulty filter</param>
    /// <returns>A list of leaderboard entries, ordered by completion time</returns>
    Task<List<Leaderboard>> GetTopEntriesAsync(int count, string? difficulty = null);

    /// <summary>
    /// Retrieves all leaderboard entries for a specific player
    /// </summary>
    /// <param name="playerName">The name of the player</param>
    /// <returns>A list of the player's leaderboard entries, ordered by completion time</returns>
    Task<List<Leaderboard>> GetPlayerEntriesAsync(string playerName);
}
