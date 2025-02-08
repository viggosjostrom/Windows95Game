using System;
using System.ComponentModel.DataAnnotations;

public class GameSave
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string PlayerName { get; set; }

    [Required]
    public string GameState { get; set; } = string.Empty;

    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    
    public DateTime LastActivity { get; set; } = DateTime.UtcNow;
}
