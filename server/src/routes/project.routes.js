const express = require('express');
const router = express.Router();
const { getAll, getFeatured, getBySlug } = require('../controllers/project.controller');

router.get('/', getAll);
router.get('/featured', getFeatured);
router.get('/:slug', getBySlug);

module.exports = router;
