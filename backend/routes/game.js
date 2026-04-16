const express = require('express');
const gameController = require('../controllers/gameController');
const auth = require('../middleware/auth');

const router = express.Router();

// Routes
router.post('/session', auth, gameController.saveGameSession);
router.get('/history', auth, gameController.getGameHistory);
router.get('/leaderboard', gameController.getLeaderboard);

module.exports = router;