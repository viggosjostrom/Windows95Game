using Microsoft.AspNetCore.Mvc;
using Backend.DTOs;
using Backend.Repositories;

namespace Backend.Controllers;

/// <summary>
/// Manages player name validation and reservation
/// </summary>
[ApiController]
[Route("api/players")]
public class PlayerController : ControllerBase
{
    private readonly IGameSaveRepository _repository;
    private static readonly TimeSpan NameReservationPeriod = TimeSpan.FromHours(24);

    public PlayerController(IGameSaveRepository repository)
    {
        _repository = repository;
    }

    /// <summary>
    /// Validates if a player name is available for use
    /// </summary>
    /// <param name="request">The player name to validate</param>
    /// <returns>
    /// 200 OK with availability status and message
    /// 400 Bad Request if name is empty or invalid
    /// </returns>
    [HttpPost("validate")]
    public async Task<IActionResult> ValidatePlayerName([FromBody] PlayerDto request)
    {
        if (string.IsNullOrWhiteSpace(request.PlayerName))
        {
            return BadRequest(new { message = "Player name cannot be empty." });
        }

        var existingSave = await _repository.GetByPlayerNameAsync(request.PlayerName);
        
        if (existingSave == null)
        {
            return Ok(new { isAvailable = true, message = "Name is available!" });
        }

        bool isNameFree = existingSave.LastActivity < DateTime.UtcNow.Subtract(NameReservationPeriod);
        
        return Ok(new { 
            isAvailable = isNameFree,
            message = isNameFree 
                ? "Name is available!" 
                : $"This name is in use. Please try again in {GetTimeRemaining(existingSave.LastActivity)}"
        });
    }

    private string GetTimeRemaining(DateTime lastActivity)
    {
        var timeUntilFree = (lastActivity.Add(NameReservationPeriod) - DateTime.UtcNow);
        
        if (timeUntilFree.TotalHours >= 1)
        {
            return $"{Math.Ceiling(timeUntilFree.TotalHours)} hours";
        }
        return $"{Math.Ceiling(timeUntilFree.TotalMinutes)} minutes";
    }
}
