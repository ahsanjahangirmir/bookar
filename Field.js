const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    Company_Email: String,
    Company_Name: String,
    Field_Name: String,
    Rate: Number,
    Open_Hours: String,
    Already_Booked: Array
  });

module.exports = mongoose.model('Field', fieldSchema);