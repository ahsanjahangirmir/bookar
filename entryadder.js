const fs = require('fs');
const mongoose = require('mongoose');
const Company = require('./Company');

mongoose.connect('mongodb+srv://bookar360:Bookar360720@bookarmain.kzrocom.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Read the image file as binary data
        const imageData = fs.readFileSync('./assets/Images/fifthgen.png');

        // Convert the image data to a buffer
        const imageBuffer = Buffer.from(imageData);

        // Create a new instance of the Company model with the image buffer included
        const sampleCompany = new Company({
            Company_ID: 12,
            Company_Name: '1th Gen',
            Location: 'Phase 1',
            Contact_Name: 'Irdfan Bhai',
            Email: 'fiftdhgen@example.com',
            Website_URL: 'https://www.fifdth.com',
            Image: imageBuffer // Provide the image buffer here
        });

        // Save the company entry to MongoDB
        sampleCompany.save()
            .then(() => {
                console.log('Sample company entry saved successfully');
            })
            .catch(error => {
                console.error('Error saving sample company entry:', error);
            })
            .finally(() => {
                // Close the connection after saving
                mongoose.connection.close();
            });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });