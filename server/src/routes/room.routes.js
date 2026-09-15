const express = require('express');
const router = express.Router();
const { createRoom, getActiveCalls, endCall } = require('../controllers/room.controller');

router.post('/', createRoom);
router.get('/active', getActiveCalls);
router.delete('/:callId', endCall);

module.exports = router;
