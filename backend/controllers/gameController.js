const gameService = require('../services/gameService');

exports.saveGameSession = async (req, res) => {
  try {
    const { character1, character2, winner, duration, moves, experienceGained, isPlayerWinner } = req.body;

    const session = await gameService.createGameSession({
      userId: req.user._id,
      character1,
      character2,
      winner,
      duration,
      moves,
      experienceGained
    });

    const user = await gameService.updateUserStatsAfterBattle({
      userId: req.user._id,
      isPlayerWinner: Boolean(isPlayerWinner),
      experienceGained: experienceGained || 20
    });

    res.status(201).json({
      message: 'Game session saved successfully',
      session,
      userStats: {
        level: user.level,
        experience: user.experience,
        battlesWon: user.gameStats.battlesWon,
        battlesLost: user.gameStats.battlesLost
      }
    });
  } catch (error) {
    console.error('Save game session error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getGameHistory = async (req, res) => {
  try {
    const sessions = await gameService.getGameHistory(req.user._id);
    res.json(sessions);
  } catch (error) {
    console.error('Get game history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await gameService.getLeaderboard();
    res.json(users);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};