const mongoose = require("mongoose");

// Define the Offer Schema
const OfferSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  validity: { type: Date, required: true },
  type: {
    type: String,
    enum: ["offer", "discount", "special", "event", "promotion"], 
    required: true
  },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  claims: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      claimedDate: {
        type: Date,
        default: Date.now 
      }
    }
  ]
});

module.exports = mongoose.model("Offer", OfferSchema);
