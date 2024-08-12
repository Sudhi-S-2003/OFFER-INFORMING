const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');
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

// Create a Poll
router.post('/create', auth, async (req, res) => {
    // Businesses only
    if (req.user.userType !== 'business') return res.status(403).json({ msg: 'Access denied' });

    const { question, options } = req.body;

    try {
        const poll = new Poll({
            question,
            options,
            businessId: req.user.id
        });

        await poll.save();
        res.status(201).json(poll);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Vote  Poll
router.post('/vote/:id', auth, async (req, res) => {
    // Customers only
    if (req.user.userType !== 'customer') return res.status(403).json({ msg: 'Access denied' });

    const { optionId } = req.body;

    try {
        const poll = await Poll.findById(req.params.id);
        if (!poll) return res.status(404).json({ msg: 'Poll not found' });

        // Check if the user has already voted
        const existingVote = poll.votes.find(vote => vote.userId.equals(req.user.id));
        if (existingVote) return res.status(400).json({ msg: 'User has already voted' });

        const option = poll.options.id(optionId);
        if (!option) return res.status(404).json({ msg: 'Option not found' });

        option.votes += 1;
        poll.votes.push({ userId: req.user.id, optionId });
        await poll.save();

        res.json({ msg: 'Vote recorded successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Polls 
router.get('/business/:id', auth, async (req, res) => {
    // Businesses only
    if (req.user.userType !== 'business') return res.status(403).json({ msg: 'Access denied' });

    try {
        const polls = await Poll.find({ businessId: req.params.id });
        res.json(polls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Polls User Voted
router.get('/user/votes', auth, async (req, res) => {
    // Customers only
    if (req.user.userType !== 'customer') return res.status(403).json({ msg: 'Access denied' });

    try {
        const polls = await Poll.find({ 'votes.userId': req.user.id });
        res.json(polls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
