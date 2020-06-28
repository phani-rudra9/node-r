var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  humid: Number,
  timstp: String,
  days: Number,
  hours: Number,
  mins: Number,
  secs: Number,
  time: Number
});

module.exports = mongoose.model('HumidityData', dataSchema);