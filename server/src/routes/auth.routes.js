const express = require('express');
const router = express.Router();
const { login, getMe, updatePassword, createSeedUser } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

router.post('/seed', createSeedUser);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/password', protect, updatePassword);

module.exports = router;
