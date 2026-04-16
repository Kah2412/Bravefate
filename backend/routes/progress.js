const express = require('express');
const progressController = require('../controllers/progressController');
const auth = require('../middleware/auth');

const router = express.Router();

// Routes
router.get('/', auth, progressController.getProgress);
router.post('/mission', auth, progressController.completeMission);
router.post('/character', auth, progressController.unlockCharacter);

module.exports = router;