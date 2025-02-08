using System;
using System.ComponentModel.DataAnnotations;

public class Leaderboard
{
    [Key]
    public int Id { get; set; }

    public required string PlayerName { get; set; }

    [Required]
    public TimeSpan CompletionTime { get; set; }

    public DateTime AchievedAt { get; set; } = DateTime.UtcNow;

    public string? GameDifficulty { get; set; }
}
