const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
require('dotenv').config();

const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
};

router.get('/searchTrains', async (req, res) => {
    const { from, to, date } = req.query;

    try {
        if (!from || !to || !date) {
            return res.status(400).json({ msg: 'Please provide from, to, and date' });
        }

        const dayOfWeek = getDayOfWeek(date);
        // console.log(dayOfWeek);
        const sourceTrains = await Train.find({
            Station_Name: from,
            Day: dayOfWeek,
        });

        const destinationTrains = await Train.find({
            Station_Name: to,
        });

        const result = [];

        for (const source of sourceTrains) {
            for (const destination of destinationTrains) {
                if (source.Train_No === destination.Train_No && source.Distance < destination.Distance) {
                    result.push({
                        Train_No: source.Train_No,
                        Source: {
                            Station_Name: source.Station_Name,
                            Distance: source.Distance
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
