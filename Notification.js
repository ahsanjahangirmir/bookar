const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    User_Email: String,
    Msg: String,
});

module.exports = mongoose.model('Notification', notificationSchema);