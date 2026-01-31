const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Property = require('./models/Property');
const Partner = require('./models/Partner');

const app = express();

// 1. السماح للجميع بالدخول (بدون شروط)
app.use(cors()); 
app.use(express.json());

// 2. فحص الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log("DB Connection Error:", err));

// --- ROUTES ---

// GET Properties
app.get('/api/properties', async (req, res) => {
  try {
    const { type, listingType, location, governorate, isHotDeal } = req.query;
    let query = {};
    
    if (type && type !== 'All') query.type = type;
    if (listingType && listingType !== 'All') query.listingType = listingType;
    if (governorate && governorate !== 'All') query.governorate = governorate;
    if (location && location !== 'All') query.city = location;
    if (isHotDeal === 'true') query.isHotDeal = true;

    const properties = await Property.find(query).sort({ isFeatured: -1, createdAt: -1 });
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.json([]); // إرجاع قائمة فارغة بدلاً من الخطأ
  }
});

// GET Single Property
app.get('/api/properties/:id', async (req, res) => {
    try {
        const prop = await Property.findById(req.params.id);
        if (!prop) return res.status(404).json({ error: "Not Found" });
        res.json(prop);
    } catch (err) { res.status(500).json({ error: "Server Error" }); }
});

// ADD Property (Admin)
app.post('/api/properties', async (req, res) => {
    // التأكد من تطابق كلمة السر
    if (req.body.secret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ error: "Wrong Password! Check Vercel Env Vars." });
    }
    try {
        const newProperty = new Property(req.body);
        const saved = await newProperty.save();
        res.json(saved);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// DELETE Property (Admin)
app.delete('/api/properties/:id', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// EDIT Property (Admin)
app.put('/api/properties/:id', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    try {
        const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Partners Routes
app.get('/api/partners', async (req, res) => {
    try { const partners = await Partner.find(); res.json(partners); } catch { res.json([]); }
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

// View Counter
app.post('/api/properties/:id/view', async (req, res) => {
    await Property.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json({ message: "Viewed" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));