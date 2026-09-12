const Service = require('../models/Service');

exports.getAll = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: services.length, services });
  } catch (error) {
    next(error);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true
    });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};
