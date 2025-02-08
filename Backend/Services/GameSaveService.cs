using Backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public interface IGameSaveService
{
    Task<bool> SaveGameAsync(GameSaveDto save);
    Task<GameSave?> LoadGameAsync(string playerName);
}

public class GameSaveService : IGameSaveService
{
    private readonly IGameSaveRepository _repository;

    public GameSaveService(IGameSaveRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> SaveGameAsync(GameSaveDto save)
    {
        var existingSave = await _repository.GetByPlayerNameAsync(save.PlayerName);

        if (existingSave != null)
        {
            existingSave.GameState = save.GameState ?? string.Empty;
            existingSave.LastUpdated = DateTime.UtcNow;
            existingSave.LastActivity = DateTime.UtcNow;
            return await _repository.UpdateAsync(existingSave);
        }

        var newSave = new GameSave
        {
            PlayerName = save.PlayerName,
            GameState = save.GameState ?? string.Empty,
            LastUpdated = DateTime.UtcNow,
            LastActivity = DateTime.UtcNow
        };

        return await _repository.SaveAsync(newSave);
    }

    public async Task<GameSave?> LoadGameAsync(string playerName)
    {
        var save = await _repository.GetByPlayerNameAsync(playerName);
        if (save != null)
        {
            save.LastActivity = DateTime.UtcNow;
            await _repository.UpdateAsync(save);
        }
        return save;
    }
}
