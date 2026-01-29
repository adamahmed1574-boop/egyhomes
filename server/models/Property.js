const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  
  // Location
  governorate: { type: String, required: true },
  city: { type: String, required: true },
  mapUrl: { type: String },
  
  // Specs
  area: { type: Number, required: true },
  type: { type: String, default: 'Apartment' },
  listingType: { type: String, default: 'Buy' }, // Buy or Rent
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  level: { type: Number },
  
  // Media
  images: { type: [String], required: true },
  videoUrl: { type: String },
  
  // Status
  isSold: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isHotDeal: { type: Boolean, default: false },
  
  // Mortgage Config
  mortgagePlans: { type: [Number], default: [12, 60, 120] }, 
  interestRate: { type: Number, default: 20 },
  maxMortgagePercent: { type: Number, default: 80 }, 
  
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);