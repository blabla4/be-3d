var mongoose = require('mongoose');

var formatedDataSchema = mongoose.Schema({
  node: String,
  name: String,
  timestamp: String,
  signal: String,
  value: String,
  feed_type: String,
  valueCelsius: Number,
  type: String
}, { collection: 'formatedData' });

module.exports = mongoose.model('formatedData', formatedDataSchema);