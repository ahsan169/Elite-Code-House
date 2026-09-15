const express = require('express');
const router = express.Router();
const { sendMessage, getConversation } = require('../controllers/chat.controller');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/send', [
  body('message').notEmpty().withMessage('Message is required')
], validate, sendMessage);

router.get('/:conversationId', getConversation);

module.exports = router;
