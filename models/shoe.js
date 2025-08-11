const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoeSchema = new Schema({
    name: { type: String, required: true },
    brand: String,
    category: String,
    price: Number,
    imageURL: String // correct name to match data input
});

module.exports = mongoose.model('shoe', ShoeSchema);
