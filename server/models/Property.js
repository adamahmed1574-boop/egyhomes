const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: String,
    price: Number,
    location: String,
    governorate: String,
    description: String,
    images: [String],
    // --- NEW FEATURES ---
    isSold: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);