const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'Quote is required'],
    trim: true
  },
  authorName: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  authorRole: {
    type: String,
    default: ''
  },
  authorCompany: {
    type: String,
    default: ''
  },
  authorImage: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
