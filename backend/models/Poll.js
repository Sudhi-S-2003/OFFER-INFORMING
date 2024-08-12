const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ text: String, votes: { type: Number, default: 0 } }],
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    votes: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, optionId: { type: mongoose.Schema.Types.ObjectId } }] // New field
});

module.exports = mongoose.model('Poll', PollSchema);
