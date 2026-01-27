const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Property = require('./models/Property');
const Partner = require('./models/Partner'); // Import new model

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

// --- 1. PROPERTIES ROUTES ---

// GET ALL
app.get('/api/properties', async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 }); // Newest first
        res.json(properties);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADD NEW (Secure)
app.post('/api/properties', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    try {
        const newProperty = new Property(req.body);
        const saved = await newProperty.save();
        res.json(saved);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// EDIT PROPERTY (Secure) - NEW!
app.put('/api/properties/:id', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    try {
        const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE (Secure)
app.delete('/api/properties/:id', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// INCREMENT VIEW COUNT (Public) - NEW!
app.post('/api/properties/:id/view', async (req, res) => {
    try {
        await Property.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
        res.json({ message: "View counted" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});


// --- 2. PARTNERS ROUTES (Verified Companies) ---

// GET PARTNERS
app.get('/api/partners', async (req, res) => {
    const partners = await Partner.find();
    res.json(partners);
});

// ADD PARTNER (Secure)
app.post('/api/partners', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.json(newPartner);
});

// DELETE PARTNER (Secure)
app.delete('/api/partners/:id', async (req, res) => {
    if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "Wrong Password" });
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));