const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const projectController = require('../controllers/project.controller');
const serviceController = require('../controllers/service.controller');
const testimonialController = require('../controllers/testimonial.controller');
const blogController = require('../controllers/blog.controller');
const messageController = require('../controllers/message.controller');

router.use(protect);

router.get('/projects', projectController.getAll);
router.post('/projects', projectController.create);
router.put('/projects/:id', projectController.update);
router.delete('/projects/:id', projectController.delete);

router.get('/services', serviceController.getAll);
router.post('/services', serviceController.create);
router.put('/services/:id', serviceController.update);
router.delete('/services/:id', serviceController.delete);

router.get('/testimonials', testimonialController.getAll);
router.post('/testimonials', testimonialController.create);
router.put('/testimonials/:id', testimonialController.update);
router.delete('/testimonials/:id', testimonialController.delete);

router.get('/blog', blogController.getAllAdmin);
router.post('/blog', blogController.create);
router.put('/blog/:id', blogController.update);
router.delete('/blog/:id', blogController.delete);

router.get('/messages', messageController.getAll);
router.put('/messages/:id/read', messageController.markAsRead);
router.delete('/messages/:id', messageController.delete);

module.exports = router;
