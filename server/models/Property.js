const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  // Basic Info
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  
  // Location
  governorate: { type: String, required: true },
  city: { type: String, required: true },
  mapUrl: { type: String },
  
  // Details
  area: { type: Number, required: true },
  type: { type: String, default: 'Apartment' },
  listingType: { type: String, default: 'Buy' },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  level: { type: Number },
  
  // Media
  images: { type: [String], required: true },
  videoUrl: { type: String },
  
  // Status & Badges
  isSold: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isHotDeal: { type: Boolean, default: false },
  
  // Mortgage Config
  mortgagePlans: { type: [Number], default: [12, 60, 120] }, // Months (e.g. 1, 5, 10 years)
  interestRate: { type: Number, default: 20 }, // Annual Interest Rate %
  
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
