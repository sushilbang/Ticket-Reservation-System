const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST /reservations - Create a new reservation
router.post('/', async (req, res) => {
    const {
        email,
        total_fare,
        journey_id,
        status,
        seat_class_id,
        seats_reserved,
    } = req.body;

    try {
        // Validate the incoming data
        if (!email || !total_fare || !journey_id || !seat_class_id || !seats_reserved) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Create a new reservation instance
        const newReservation = new Reservation({
            email,
            total_fare,
            journey_id,
            reservation_date: new Date(),
            status,
        });

        // Save the reservation to the database
        await newReservation.save();

        // Return the newly created reservation as a response
        res.status(201).json(newReservation);
        
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ msg: 'Server Error', error: error.message }); // Send a JSON response
    }
});

module.exports = router;
