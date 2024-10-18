const mongoose = require('mongoose');

const seatClassSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: true,
  },
  total_seats: {
    type: Number,
    required: true,
  },
  fare_per_km: {
    type: Number,
    required: true,
  },
});

const SeatClass = mongoose.model('SeatClass', seatClassSchema);
module.exports = SeatClass;
