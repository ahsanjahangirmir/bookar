const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    Company_Name: String,
    Field_Name: String,
    Booking_Time: String,
    Company_Email: String,
    User_Email: String,
    Total: Number,
    Canceled: Boolean,
  });

module.exports = mongoose.model('Booking', bookingSchema);