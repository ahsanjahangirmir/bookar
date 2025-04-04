const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
    service: String,
    hourlyRate: Number,
    fieldCount: Number,
  });

// Define a location schema that follows the GeoJSON specification
const locationSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number], // Array of numbers for longitude and latitude
      required: true
    }
  });

const listingSchema = new mongoose.Schema({
    email: String,
    name: String,
    address: String,
    description: String,
    services: [pricingSchema], // Assuming there can be multiple services
    facilities: [String], // Array of strings if facilities are just names
    coverImg: { data: Buffer, contentType: String }, // To store the image data and MIME type
    galleryImg: [{ data: Buffer, contentType: String }], // An array of images
    location: locationSchema,
    openHours: String,
    Already_Booked: Array
  });

module.exports = mongoose.model('Listing', listingSchema);