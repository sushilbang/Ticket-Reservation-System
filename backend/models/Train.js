const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    SN: Number,
    Train_No: Number,
    Station_Code: String,
    Station_Name: String,
    Route_Number: Number,
    Arrival_time: String,
    Departure_Time: String,
    Distance: Number,
    Day: String,
    "1A": Number,
    "2A": Number,
    "3A": Number,
    SL: Number,
});

module.exports = mongoose.model('Train', trainSchema)