const express = require('express');
const router = express.Router();
const { submit } = require('../controllers/message.controller');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], validate, submit);

module.exports = router;
