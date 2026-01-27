const mongoose = require('mongoose');
const PartnerSchema = new mongoose.Schema({
    name: String,
    logo: String
});
module.exports = mongoose.model('Partner', PartnerSchema);