namespace Backend.DTOs;

/// <summary>
/// Data transfer object for game save operations
/// </summary>
public class GameSaveDto
{
    /// <summary>
    /// The name of the player whose game is being saved
    /// </summary>
    public required string PlayerName { get; set; }

    /// <summary>
    /// The serialized game state data. Null when creating a new game.
    /// </summary>
    public string? GameState { get; set; }
}
