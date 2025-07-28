const express = require('express');
const router = express.Router();
const Shoe = require('../models/shoe');

// GET /api/shoes — returns all shoes or nearby if lat/lng provided

// router.get('/shoes', async (req, res, next) => {
//     const { lng, lat } = req.query;

//     try {
//         let ninjas;

//         if (lng && lat) {
//             shoes = await Shoe.aggregate([
//                 {
//                     $geoNear: {
//                         near: {
//                             type: 'Point',
//                             coordinates: [parseFloat(lng), parseFloat(lat)]
//                         },
//                         distanceField: 'dist.calculated',
//                         maxDistance: 100000,
//                         spherical: true
//                     }
//                 }
//             ]);
//         } else {
//             shoes = await Shoe.find({});
//         }

//         res.send(shoes);
//     } catch (err) {
//         next(err);
//     }
// });


// GET /api/shoes — returns shoes near provided lat/lng if available
router.get('/shoes', async (req, res, next) => {
    const { lng, lat } = req.query;

    try {
        let shoes;

        if (lng && lat) {
            shoes = await Shoe.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [parseFloat(lng), parseFloat(lat)]
                        },
                        distanceField: 'dist.calculated',
                        maxDistance: 100000, // 100 km
                        spherical: true,
                        query: { available: true } // ✅ only available shoes
                    }
                }
            ]);
        } else {
            shoes = await Shoe.find({ available: true });
        }

        res.send(shoes);
    } catch (err) {
        next(err);
    }
});



// POST /api/shoes — Create a shoe

router.post('/shoes', async (req, res, next) => {
    try {
        const shoe = await Shoe.create(req.body);
        res.status(201).send(shoe);
    } catch (err) {
        next(err);
    }
});

// PUT /api/shoes/:id — Update a shoe

router.put('/shoes/:id', async (req, res, next) => {
    try {
        const shoe = await Shoe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!shoe) return res.status(404).send({ error: 'Shoe not found' });

        res.send(shoe);
    } catch (err) {
        next(err);
    }
});

// DELETE /api/shoes/:id — Delete a shoe

router.delete('/shoes/:id', async (req, res) => {
    try {
        const shoe = await Shoe.findByIdAndDelete(req.params.id);

        if (!shoe) return res.status(404).send({ error: 'Shoe not found' });

        res.send({ message: 'Shoe deleted successfully', shoe });
    } catch (err) {
        res.status(500).send({ error: 'Failed to delete shoe' });
    }
});

module.exports = router;
