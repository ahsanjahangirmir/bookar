const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    Rating: Number,
    UserName: String,
    CompanyEmailGiven: String,
    Comments: String
  });

module.exports = mongoose.model('Reviews', reviewsSchema);