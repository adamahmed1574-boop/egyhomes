const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Property = require('./models/Property');
const Partner = require('./models/Partner');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB Connected")).catch(err=>console.log(err));

app.get('/api/properties', async (req, res) => {
  try {
    const { type, listingType, location, governorate, isHotDeal } = req.query;
    let query = {};
    if (type && type !== 'All') query.type = type;
    if (listingType && listingType !== 'All') query.listingType = listingType;
    if (governorate && governorate !== 'All') query.governorate = governorate;
    if (location && location !== 'All') query.city = location;
    if (isHotDeal === 'true') query.isHotDeal = true;
    
    const properties = await Property.find(query).sort({ createdAt: -1 });
    res.json(properties); // Returns Array
  } catch (err) {
    res.json([]); // RETURN EMPTY ARRAY ON ERROR (Fixes .map crash)
  }
});

app.get('/api/partners', async (req, res) => {
    try {
        const partners = await Partner.find();
        res.json(partners);
    } catch (err) { res.json([]); }
});

// ... (Keep other POST/PUT/DELETE routes same as before) ...

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));