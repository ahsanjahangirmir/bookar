const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Age: { type: Number, required: true },
  Password: { type: String, required: true },
  Phone_number: { type: String, required: true, unique: true },
  Username: { type: String, required: true, unique: true },
  verificationCode: { type: Number, default: null }, // Defaulted to null
  verified: { type: Boolean, default: false }, // Added field for verification status
  userType: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);