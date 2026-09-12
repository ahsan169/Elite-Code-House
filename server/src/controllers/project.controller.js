const Project = require('../models/Project');

exports.getAll = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

exports.getFeatured = async (req, res, next) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.status(200).json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true
    });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};
