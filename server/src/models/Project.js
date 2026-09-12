const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    default: ''
  },
  shortDescription: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'saas', 'ai', 'ecommerce'],
    required: [true, 'Category is required']
  },
  technologies: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String
  }],
  thumbnail: {
    type: String,
    default: ''
  },
  clientName: {
    type: String,
    default: ''
  },
  projectUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  seoTitle: {
    type: String,
    default: ''
  },
  seoDescription: {
    type: String,
    default: ''
  }
}, { timestamps: true });

projectSchema.pre('save', function() {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.model('Project', projectSchema);
