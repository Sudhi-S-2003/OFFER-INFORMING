const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv'); 
dotenv.config(); 
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/offer-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/offers', require('./routes/offers'));
app.use('/api/polls', require('./routes/Polls'));
app.use('/api/shops',require('./routes/shop'))
app.use('/api/users',require('./routes/users'))

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
