const express = require('express');
const router = express.Router();
const { getAll, getBySlug } = require('../controllers/service.controller');

router.get('/', getAll);
router.get('/:slug', getBySlug);

module.exports = router;
