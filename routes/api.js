const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

const Shoe = require('../models/shoe');

// GET shoes
router.get('/shoes', async (req, res, next) => {
    const { brand } = req.query;

    try {
        let shoes;

        if (brand) {
            shoes = await Shoe.find({
                brand: { $regex: new RegExp(brand, 'i') }
            });
        } else {
            shoes = await Shoe.find({});
        }

        res.send(shoes);
    } catch (err) {
        next(err);
    }
});

// POST shoe using image URL
router.post('/shoes/url', async (req, res, next) => {
    try {
        const { name, brand, category, price, imageURL } = req.body;

        const shoe = new Shoe({
            name,
            brand,
            category,
            price,
            imageURL // directly saving the image URL
        });

        await shoe.save();
        res.status(201).send(shoe);
    } catch (err) {
        next(err);
    }
});

// UPDATE shoe
router.put('/shoes/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedShoe = await Shoe.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!updatedShoe) {
            return res.status(404).send({ message: 'Shoe not found' });
        }

        res.send(updatedShoe);
    } catch (err) {
        next(err);
    }
});

// DELETE shoe
router.delete('/shoes/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedShoe = await Shoe.findByIdAndDelete(id);

        if (!deletedShoe) {
            return res.status(404).send({ message: 'Shoe not found' });
        }

        res.send({ message: 'Shoe deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
