var mongoose = require('mongoose');

var motionDataSchema = mongoose.Schema({
  cookie: String,
  date: Date,
  durationSeconds: Number,
  numberMovements: Number,
  avgIntensity: Number
}, { collection: 'motions' });

module.exports = mongoose.model('motionData', motionDataSchema);
