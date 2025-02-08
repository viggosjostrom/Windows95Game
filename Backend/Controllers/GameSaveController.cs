using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.DTOs;

namespace Backend.Controllers;

/// <summary>
/// Manages game save operations
/// </summary>
[ApiController]
[Route("api/gamesaves")]
public class GameSaveController : ControllerBase
{
    private readonly IGameSaveService _gameSaveService;

    public GameSaveController(IGameSaveService gameSaveService)
    {
        _gameSaveService = gameSaveService;
    }

    /// <summary>
    /// Saves the current game state for a player
    /// </summary>
    /// <param name="save">The game save data</param>
    /// <returns>
    /// 200 OK with success message if save was successful
    /// 400 Bad Request if save failed
    /// </returns>
    [HttpPost("save")]
    public async Task<IActionResult> SaveGame([FromBody] GameSaveDto save)
    {
        var result = await _gameSaveService.SaveGameAsync(save);
        return result ? Ok(new { message = "Game saved!" }) : BadRequest(new { message = "Save failed!" });
    }

    /// <summary>
    /// Loads a player's saved game
    /// </summary>
    /// <param name="playerName">Name of the player whose save to load</param>
    /// <returns>
    /// 200 OK with the game save data if found
    /// 404 Not Found if no save exists
    /// </returns>
    [HttpGet("load/{playerName}")]
    public async Task<IActionResult> LoadGame(string playerName)
    {
        var save = await _gameSaveService.LoadGameAsync(playerName);
        return save != null ? Ok(save) : NotFound(new { message = "No save found!" });
    }
}
