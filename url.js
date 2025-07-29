
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  userEmail: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clickCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("URL", urlSchema);
