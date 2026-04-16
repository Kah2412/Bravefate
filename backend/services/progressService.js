const User = require('../models/User');

exports.getUserProgress = async (userId) => {
  const user = await User.findById(userId).select('level experience achievements progress gameStats');
  if (!user) throw new Error('User not found');

  return {
    level: user.level,
    experience: user.experience,
    achievements: user.achievements,
    progress: user.progress,
    gameStats: user.gameStats
  };
};

exports.completeMissionForUser = async (userId, missionId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!user.progress.completedMissions.includes(missionId)) {
    user.progress.completedMissions.push(missionId);
    user.experience += 50;
    const newLevel = Math.floor(user.experience / 100) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
    }
    await user.save();
  }

  return {
    experienceGained: 50,
    newLevel: user.level,
    totalExperience: user.experience
  };
};

exports.unlockCharacterForUser = async (userId, characterName) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!user.progress.unlockedCharacters.includes(characterName)) {
    user.progress.unlockedCharacters.push(characterName);
    await user.save();
  }

  return user.progress.unlockedCharacters;
};