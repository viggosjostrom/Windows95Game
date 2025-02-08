namespace Backend.DTOs;

/// <summary>
/// Data transfer object for leaderboard entries
/// </summary>
public class LeaderboardDto
{
    /// <summary>
    /// The name of the player who achieved this score
    /// </summary>
    public required string PlayerName { get; set; }

    /// <summary>
    /// The time taken to complete the game, in seconds
    /// </summary>
    public required double CompletionTimeSeconds { get; set; }

    /// <summary>
    /// The difficulty level at which the game was completed
    /// </summary>
    public string? GameDifficulty { get; set; }
}
