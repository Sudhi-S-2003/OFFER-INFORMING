const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Middleware 
const isBusiness = (req, res, next) => {
    if (req.user.userType !== 'business') return res.status(403).json({ msg: 'Access denied' });
    next();
};

// Add New Shop
router.post('/add', auth, isBusiness, async (req, res) => {
    const { name, address, contact } = req.body;
    try {
        const shop = new Shop({
            name,
            address,
            contact,
            businessId: req.user.id
        });

        await shop.save();
        res.status(201).json(shop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// View All Shops for a Business
router.get('/all', auth, isBusiness, async (req, res) => {
    try {
        const shops = await Shop.find({ businessId: req.user.id });
        res.json(shops);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update Shop Details
router.put('/update/:id', auth, isBusiness, async (req, res) => {
    const { name, address, contact } = req.body;
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) return res.status(404).json({ msg: 'Shop not found' });
        if (shop.businessId.toString() !== req.user.id) return res.status(403).json({ msg: 'Access denied' });

        shop.name = name || shop.name;
        shop.address = address || shop.address;
        shop.contact = contact || shop.contact;

        await shop.save();
        res.json(shop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Shop
router.delete('/delete/:id', auth, isBusiness, async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) return res.status(404).json({ msg: 'Shop not found' });
        if (shop.businessId.toString() !== req.user.id) return res.status(403).json({ msg: 'Access denied' });

        await Shop.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Shop removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
