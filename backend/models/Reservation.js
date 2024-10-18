const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  email: {
    type: String,
    ref: 'User',
    required: true,
  },
  total_fare: {
    type: Number,
    required: true,
  },
  journey_id: {
    type: String,
    ref: 'Journey',
    required: true,
  },
  reservation_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
