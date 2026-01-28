const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  area: { type: Number, required: true },
  description: String,
  images: { type: [String], required: true },
  type: { type: String, default: 'Apartment' },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  level: { type: Number },
  isSold: { type: Boolean, default: false },
  // New Features
  videoUrl: { type: String },       // Feature #2 (YouTube)
  mapUrl: { type: String },         // Feature #8 (Google Maps)
  isFeatured: { type: Boolean, default: false }, // Feature #6 (Featured Badge)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);