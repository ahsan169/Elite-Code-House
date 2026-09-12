const express = require('express');
const router = express.Router();
const { getAll, getFeatured } = require('../controllers/testimonial.controller');

router.get('/', getAll);
router.get('/featured', getFeatured);

module.exports = router;
