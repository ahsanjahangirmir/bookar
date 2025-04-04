const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
    service: String,
    hourlyRate: Number,
    fieldCount: Number,
  });


const companySchema = new mongoose.Schema({
    Company_ID: Number,
    Company_Name: String,
    Location: String,
    Contact_Name: String,
    Email: String,
    Website_URL: String,
    Image: Buffer, // Store image data as a buffer
    Description: String,
    openHours: String,
    services: [pricingSchema], // Assuming there can be multiple services
    facilities: [String], // Array of strings if facilities are just names
});

module.exports = mongoose.model('Company', companySchema);