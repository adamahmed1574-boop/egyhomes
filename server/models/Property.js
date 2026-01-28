const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true }, // The City
  governorate: { type: String, required: true }, // The Governorate
  area: { type: Number, required: true },
  description: String,
  
  // Media
  images: { type: [String], required: true },
  videoUrl: { type: String },
  mapUrl: { type: String },
  
  // Details
  type: { type: String, default: 'Apartment' },
  listingType: { type: String, default: 'Buy' }, // Buy or Rent
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  level: { type: Number },
  
  // Status
  isSold: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isHotDeal: { type: Boolean, default: false },
  
  // Mortgage Config (List of allowed years, e.g. [1, 3, 5, 10])
  mortgagePlans: { type: [Number], default: [5, 10] }, 
  
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);