
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Geo schema
const GeoSchema = new Schema({
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" }
});

// Shoe schema
const ShoeSchema = new Schema({
    name: { type: String, required: true },
    brand: String,
    category: String,
    price: Number,
    available: { type: Boolean, default: false },
    geometry: GeoSchema
});

module.exports = mongoose.model('shoe', ShoeSchema);

