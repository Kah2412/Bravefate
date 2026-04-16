const progressService = require('../services/progressService');

exports.getProgress = async (req, res) => {
  try {
    const progress = await progressService.getUserProgress(req.user._id);
    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.completeMission = async (req, res) => {
  try {
    const { missionId } = req.body;
    const result = await progressService.completeMissionForUser(req.user._id, missionId);
    res.json({
      message: 'Mission completed',
      experienceGained: result.experienceGained,
      newLevel: result.newLevel,
      totalExperience: result.totalExperience
    });
  } catch (error) {
    console.error('Complete mission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.unlockCharacter = async (req, res) => {
  try {
    const { characterName } = req.body;
    const unlockedCharacters = await progressService.unlockCharacterForUser(req.user._id, characterName);
    res.json({
      message: 'Character unlocked',
      unlockedCharacters
    });
  } catch (error) {
    console.error('Unlock character error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};