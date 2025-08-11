const express = require('express');
const cors = require('cors'); // <-- Import CORS first
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express(); // <-- Initialize app BEFORE using it

app.use(cors()); // <-- Now you can use it
app.use(express.static('public'));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully! ✅"))
    .catch(err => console.error("Database connection error ❌", err));

// Routes
app.use('/api', require('./routes/api'));


// Error handler
app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
