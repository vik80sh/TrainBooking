const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userBooking = new Schema({
  id: { type: String },
  username: { type: String, require: true },
  bookingDetail: { type: Object },
  trainName: { type: String },
  trainNumber: { type: String },
  price: { type: Number },
  to: { type: String },
  from: { type: String },
  date: { type: String },
});


module.exports = mongoose.model('userBooking', userBooking);