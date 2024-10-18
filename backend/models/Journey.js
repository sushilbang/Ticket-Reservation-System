const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  train_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true,
  },
  from_station: {
    type: String,
    required: true,
  },
  to_station: {
    type: String,
    required: true, 
  },
  distance: {
    type: Number,
    required: true,
  },
  departure_time: {
    type: Date,
    required: true,
  },
  arrival_time: {
    type: Date,
    required: true,
  },
});

const Journey = mongoose.model('Journey', journeySchema);
module.exports = Journey;
