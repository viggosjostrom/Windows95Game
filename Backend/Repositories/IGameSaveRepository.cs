/// <summary>
/// Repository for managing game save data
/// </summary>
public interface IGameSaveRepository
{
    /// <summary>
    /// Retrieves a game save by player name
    /// </summary>
    /// <param name="playerName">The name of the player</param>
    /// <returns>The game save if found, null otherwise</returns>
    Task<GameSave?> GetByPlayerNameAsync(string playerName);

    /// <summary>
    /// Creates a new game save
    /// </summary>
    /// <param name="gameSave">The game save to create</param>
    /// <returns>True if save was successful, false otherwise</returns>
    Task<bool> SaveAsync(GameSave gameSave);

    /// <summary>
    /// Updates an existing game save
    /// </summary>
    /// <param name="gameSave">The game save to update</param>
    /// <returns>True if update was successful, false otherwise</returns>
    Task<bool> UpdateAsync(GameSave gameSave);
}
