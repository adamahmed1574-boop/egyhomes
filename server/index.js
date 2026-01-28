const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Property = require('./models/Property');
const Partner = require('./models/Partner');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

// --- PROPERTY ROUTES ---

// GET ALL (With Filters)
app.get('/api/properties', async (req, res) => {
  try {
    const { type, listingType, minPrice, maxPrice, location, governorate, isHotDeal } = req.query;
    
    let query = {};
    if (type && type !== 'All') query.type = type;
    if (listingType && listingType !== 'All') query.listingType = listingType;
    if (governorate && governorate !== 'All') query.governorate = governorate;
    if (location && location !== 'All') query.location = location; // City
    if (isHotDeal === 'true') query.isHotDeal = true;
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(query).sort({ isFeatured: -1, createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ONE
app.get('/api/properties/:id', async (req, res) => {
    try {
        const prop = await Property.findById(req.params.id);
        res.json(prop);
    } catch (err) { res.status(404).json({error: "Not Found"}); }
});

// ADD NEW
app.post('/api/properties', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    try {
        const newProperty = new Property(req.body);
        const saved = await newProperty.save();
        res.json(saved);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// EDIT
app.put('/api/properties/:id', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    try {
        const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE
app.delete('/api/properties/:id', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// INCREMENT VIEW
app.post('/api/properties/:id/view', async (req, res) => {
    await Property.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json({ message: "Viewed" });
});

// --- PARTNER ROUTES ---
app.get('/api/partners', async (req, res) => {
    const partners = await Partner.find();
    res.json(partners);
});

app.post('/api/partners', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.json(newPartner);
});

app.delete('/api/partners/:id', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));