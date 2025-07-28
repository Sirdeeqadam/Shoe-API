
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected successfully! ✅");
    })
    .catch(err => {
        console.error("Database connection error: ❌", err);
    });

app.use(express.static('public'))
app.use(bodyParser.json());

// Initialize routes
app.use('/api', require('./routes/api'));

// Error handling middleware
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});