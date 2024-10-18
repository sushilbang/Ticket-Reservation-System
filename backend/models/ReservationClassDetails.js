const mongoose = require('mongoose');

const reservationClassDetailsSchema = new mongoose.Schema({
  reservation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
  seat_class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SeatClass',
    required: true,
  },
  seats_reserved: {
    type: Number,
    required: true,
  },
});

const ReservationClassDetails = mongoose.model('ReservationClassDetails', reservationClassDetailsSchema);
module.exports = ReservationClassDetails;
