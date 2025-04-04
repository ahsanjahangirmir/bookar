// Inventory.js
const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const inventorySchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [inventoryItemSchema],
});

module.exports = mongoose.model('Inventory', inventorySchema);
