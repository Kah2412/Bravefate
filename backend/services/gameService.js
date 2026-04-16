const GameSession = require('../models/GameSession');
const User = require('../models/User');

exports.createGameSession = async ({ userId, character1, character2, winner, duration, moves, experienceGained }) => {
  const session = new GameSession({
    userId,
    character1,
    character2,
    winner,
    duration,
    moves,
    experienceGained
  });
  await session.save();
  return session;
};

exports.updateUserStatsAfterBattle = async ({ userId, isPlayerWinner, experienceGained = 20 }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.gameStats.totalBattles += 1;
  user.gameStats.battlesWon += isPlayerWinner ? 1 : 0;
  user.gameStats.battlesLost += isPlayerWinner ? 0 : 1;
  user.experience += experienceGained;

  const newLevel = Math.floor(user.experience / 100) + 1;
  if (newLevel > user.level) {
    user.level = newLevel;
  }

  await user.save();
  return user;
};

exports.getLeaderboard = async () => {
  const users = await User.find({})
    .select('username level experience gameStats avatar')
    .sort({ 'gameStats.battlesWon': -1, level: -1, experience: -1 })
    .limit(100);

  return users;
};

exports.getGameHistory = async (userId) => {
  return GameSession.find({ userId }).sort({ createdAt: -1 }).limit(50);
};