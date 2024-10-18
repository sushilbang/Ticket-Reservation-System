const express = require('express');
const router = express.Router();
const Journey = require('../models/Journey');

// POST /journeys - Create a new journey
router.post('/', async (req, res) => {
    const { train_id, from_station, to_station, distance, departure_time, arrival_time } = req.body;

    try {
        // Validate the incoming data
        if (!train_id || !from_station || !to_station || distance === undefined || !departure_time || !arrival_time) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Create a new journey instance
        const newJourney = new Journey({
            train_id,
            from_station,
            to_station,
            distance,
            departure_time,
            arrival_time,
        });

        // Save the journey to the database
        await newJourney.save();

        // Return the newly created journey as a response
        res.status(201).json(newJourney);
        
    } catch (error) {
        console.error('Error creating journey:', error);
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
});

module.exports = router;
