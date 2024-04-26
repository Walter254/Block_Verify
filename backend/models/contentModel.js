const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  contentHash: {
    type: String,
    required: true,
    unique: true,
  },
  originalUploader: {
    type: String,
    required: true,
  },
  editHistory: [{
    type: String,
  }],
  polarizationScore: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);