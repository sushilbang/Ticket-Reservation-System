const express = require('express');
const router = express.Router();
const Train = require('../models/TrainDetails');
require('dotenv').config();

const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
};

// Endpoint to get distinct station names
router.get('/stations', async (req, res) => {
    try {
        const stations = await Train.distinct('Station_Name');
        res.json(stations);
    } catch (err) {
        console.error('Error fetching stations:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Existing searchTrains endpoint
router.get('/searchTrains', async (req, res) => {
    const { from, to, date } = req.query;

    try {
        if (!from || !to || !date) {
            return res.status(400).json({ msg: 'Please provide from, to, and date' });
        }

        const dayOfWeek = getDayOfWeek(date);
        
        // Fetch all relevant trains in one query
        const trains = await Train.find({
            $or: [
                { Station_Name: from, Day: dayOfWeek },
                { Station_Name: to }
            ]
        });

        const result = [];
        
        // Separate trains into source and destination
        const sourceTrains = trains.filter(train => train.Station_Name.toLowerCase() === from.toLowerCase() && train.Day === dayOfWeek);
        const destinationTrains = trains.filter(train => train.Station_Name.toLowerCase() === to.toLowerCase());

        for (const source of sourceTrains) {
            for (const destination of destinationTrains) {
                if (source.Train_No === destination.Train_No && source.Distance < destination.Distance) {
                    result.push({
                        Train_No: source.Train_No,
                        Source: {
                            Station_Name: source.Station_Name,
                            Distance: source.Distance,
                            Departure_Time: source.Departure_Time, // Include more details if available
                            Arrival_Time: destination.Arrival_Time // Include more details if available
                        },
                        Destination: {
                            Station_Name: destination.Station_Name,
                            Distance: destination.Distance
                        }
                    });
                }
            }
        }

        res.json(result);
        
    } catch (error) {
        console.error('Error fetching trains:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
