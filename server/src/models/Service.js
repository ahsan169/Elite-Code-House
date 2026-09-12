const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
  icon: {
    type: String,
    default: ''
  },
  features: [{
    type: String,
    trim: true
  }],
  accentColor: {
    type: String,
    default: '#0ea5e9'
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

serviceSchema.pre('save', function() {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.model('Service', serviceSchema);
