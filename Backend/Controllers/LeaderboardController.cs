using Microsoft.AspNetCore.Mvc;
using Backend.Repositories;
using Backend.DTOs;

namespace Backend.Controllers;

/// <summary>
/// Manages leaderboard entries and high scores
/// </summary>
[ApiController]
[Route("api/leaderboard")]
public class LeaderboardController : ControllerBase
{
    private readonly ILeaderboardRepository _repository;

    public LeaderboardController(ILeaderboardRepository repository)
    {
        _repository = repository;
    }

    /// <summary>
    /// Adds a new entry to the leaderboard
    /// </summary>
    /// <param name="entry">The leaderboard entry to add</param>
    /// <returns>
    /// 200 OK with success message if entry was added
    /// 400 Bad Request if addition failed
    /// </returns>
    [HttpPost]
    public async Task<IActionResult> AddEntry([FromBody] LeaderboardDto entry)
    {
        var leaderboardEntry = new Leaderboard
        {
            PlayerName = entry.PlayerName,
            CompletionTime = TimeSpan.FromSeconds(entry.CompletionTimeSeconds),
            GameDifficulty = entry.GameDifficulty
        };

        var result = await _repository.AddEntryAsync(leaderboardEntry);
        return result ? Ok(new { message = "Entry added!" }) : BadRequest(new { message = "Failed to add entry!" });
    }

    /// <summary>
    /// Retrieves the top scores from the leaderboard
    /// </summary>
    /// <param name="count">Number of entries to retrieve</param>
    /// <param name="difficulty">Optional difficulty filter</param>
    /// <returns>200 OK with list of top leaderboard entries</returns>
    [HttpGet("top/{count}")]
    public async Task<IActionResult> GetTopEntries(int count, [FromQuery] string? difficulty)
    {
        var entries = await _repository.GetTopEntriesAsync(count, difficulty);
        return Ok(entries);
    }

    /// <summary>
    /// Retrieves all leaderboard entries for a specific player
    /// </summary>
    /// <param name="playerName">Name of the player</param>
    /// <returns>200 OK with list of player's leaderboard entries</returns>
    [HttpGet("player/{playerName}")]
    public async Task<IActionResult> GetPlayerEntries(string playerName)
    {
        var entries = await _repository.GetPlayerEntriesAsync(playerName);
        return Ok(entries);
    }
}
