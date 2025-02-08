namespace Backend.DTOs;

/// <summary>
/// Data transfer object for player-related operations
/// </summary>
public class PlayerDto
{
    /// <summary>
    /// The name of the player. Must be unique within the active session period.
    /// </summary>
    public required string PlayerName { get; set; }
}
