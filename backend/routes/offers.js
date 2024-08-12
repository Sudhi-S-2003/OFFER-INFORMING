const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware 
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
        if (err) return res.status(401).json({ msg: 'Token is not valid' });
        req.user = decoded.user;
        next();
    });
};

// Post Offer 
router.post('/post', auth, async (req, res) => {
    //Businesses only
    if (req.user.userType !== 'business') return res.status(403).json({ msg: 'Access denied' });

    const { title, description, image, validity, location, latitude, longitude } = req.body;

    try {
        const offer = new Offer({
            title,
            description,
            image,
            validity,
            location,
            latitude,
            longitude,
            businessId: req.user.id
        });

        await offer.save();
        res.status(201).json(offer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Offers within 10km radius
router.get('/nearby', auth, async (req, res) => {
    const { latitude, longitude, radius = 10 } = req.query;

    try {
        const offers = await Offer.find({
            latitude: { $gte: latitude - radius / 111 }, //1 degree of latitude is approximately 111 kilometers)
            latitude: { $lte: latitude + radius / 111 },
            longitude: { $gte: longitude - radius / (111 * Math.cos(latitude * (Math.PI / 180))) },
            longitude: { $lte: longitude + radius / (111 * Math.cos(latitude * (Math.PI / 180))) }
        });

        res.json(offers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Claim an Offer 
router.post('/claim/:id', auth, async (req, res) => {
    //Customers 
    if (req.user.userType !== 'customer') return res.status(403).json({ msg: 'Access denied' });

    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) return res.status(404).json({ msg: 'Offer not found' });

        if (offer.claims.includes(req.user.id)) return res.status(400).json({ msg: 'Offer already claimed' });

        offer.claims.push(req.user.id);
        await offer.save();
        res.json({ msg: 'Offer claimed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
