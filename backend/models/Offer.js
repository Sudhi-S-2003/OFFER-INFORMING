const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    validity: { type: Date, required: true },
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    claims: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

module.exports = mongoose.model('Offer', OfferSchema);
