const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Shop =require('../models/Shop')
// User Registration
router.post('/register', async (req, res) => {
    const { name, email, password, userType, shopName,shopAddress, shopContact } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            userType,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // If user is a business, create a shop
        if (userType === "business") {
            if (!shopName || !shopAddress || !shopContact) {
                return res.status(400).json({ msg: 'Please provide all shop details' });
            }

            const shop = new Shop({
                name: shopName,
                address:shopAddress,
                contact:shopContact,
                businessId: user.id
            });

            await shop.save();
        }
        res.status(200).json({ msg: 'User successfully created' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Wrong Email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                userType: user.userType,
            },
        };

        jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '10h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, userType: user.userType });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
