const Blog = require('../models/Blog');

exports.getAll = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ publishedAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    next(error);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

exports.getAllAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true
    });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.status(200).json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
};
