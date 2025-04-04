const mongoose = require('mongoose');
const Booking = require('./Booking'); // Assuming user.js is in the same directory

// Connect to MongoDB
mongoose.connect('mongodb+srv://bookar360:Bookar360720@bookarmain.kzrocom.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Sample user entry
const sampleUser = new Booking({
    Booking_ID: 123445,
    Field_ID: 12,
    Company_ID: 1,
    Email: 'h@gmail.com',
    Booking_time: '2024-01-24T11:57:55.281+00:00',
    Amount: 1500,
    Booking_type: 'Individual',
});

// Save the sample user entry to the database
sampleUser.save()
  .then(() => console.log('Sample user created successfully'))
  .catch((err) => console.error('Error creating sample user:', err));