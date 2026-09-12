const Testimonial = require('../models/Testimonial');

exports.getAll = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: testimonials.length, testimonials });
  } catch (error) {
    next(error);
  }
};

exports.getFeatured = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ featured: true }).sort({ order: 1 });
    res.status(200).json({ success: true, count: testimonials.length, testimonials });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true
    });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};
