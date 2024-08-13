const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

// Post Offer
router.post("/post", auth, async (req, res) => {
  //Businesses only
  if (req.user.userType !== "business")
    return res.status(403).json({ msg: "Access denied" });

  const {
    title,
    description,
    image,
    validity,
    type,
    location,
    latitude,
    longitude,
  } = req.body;

  try {
    const offer = new Offer({
      title,
      description,
      image,
      validity,
      type,
      location,
      latitude,
      longitude,
      businessId: req.user.id,
    });

    await offer.save();
    res.status(201).json(offer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Offers within 10km radius
router.get("/nearby", auth, async (req, res) => {
  // Extract query parameters with default value for radius
  const { latitude, longitude, radius = 10 } = req.query;

  // Ensure latitude and longitude are numbers
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  const rad = parseFloat(radius);

  if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
    return res
      .status(400)
      .json({ error: "Invalid latitude, longitude, or radius" });
  }

  try {
    // Calculate bounding box
    const latRadius = rad / 111; // 1 degree latitude is approximately 111 km
    const lonRadius = rad / (111 * Math.cos(lat * (Math.PI / 180)));

    const offers = await Offer.find({
      latitude: { $gte: lat - latRadius, $lte: lat + latRadius },
      longitude: { $gte: lon - lonRadius, $lte: lon + lonRadius },
    });

    res.json(offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all offers posted by the authenticated business
router.get("/myoffers", auth, async (req, res) => {
  // Ensure the user is a business
  if (req.user.userType !== "business")
    return res.status(403).json({ msg: "Access denied" });

  try {
    const offers = await Offer.find({ businessId: req.user.id });
    res.json(offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// Claim an Offer
router.post("/claim/:id", auth, async (req, res) => {
  // Ensure the user is a customer
  if (req.user.userType !== "customer") {
    return res.status(403).json({ msg: "Access denied" });
  }

  try {
    // Find the offer by ID
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ msg: "Offer not found" });
    }

    // Check if the offer has already been claimed by the user
    const hasClaimed = offer.claims.some(claim => claim.user.toString() === req.user.id);
    if (hasClaimed) {
      return res.status(400).json({ msg: "Offer already claimed" });
    }

    // Add the user ID to the claims array
    offer.claims.push({ user: req.user.id });
    await offer.save();

    res.json({ msg: "Offer claimed successfully", offer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//claimed offers
router.get("/claimedOffers", auth, async (req, res) => {
  // Ensure the user is a customer
  if (req.user.userType !== "customer") {
    return res.status(403).json({ msg: "Access denied" });
  }
  try {
    const claimedOffers = await Offer.find({ "claims.user": req.user.id });
    res.json(claimedOffers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
