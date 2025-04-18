const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Grant = require('./models/Grant');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.get('/grants', async (req, res) => {
    const grants = await Grant.find();
    res.json(grants);
});

app.post('/grants', async (req, res) => {
    try {
        const newGrant = new Grant(req.body);
        await newGrant.save();
        res.status(201).json(newGrant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
