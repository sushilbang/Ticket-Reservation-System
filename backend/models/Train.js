const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  train_name: {
    type: String,
    required: true,
  },
  train_number: {
    type: String,
    required: true,
    unique: true,
  },
});

const Train = mongoose.model('Train', trainSchema);
module.exports = Train;
