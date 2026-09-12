const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  seoTitle: {
    type: String,
    default: ''
  },
  seoDescription: {
    type: String,
    default: ''
  },
  seoKeywords: [{
    type: String,
    trim: true
  }]
}, { timestamps: true });

blogSchema.pre('save', function() {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

module.exports = mongoose.model('Blog', blogSchema);
