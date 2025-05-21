const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  content: { type: String, required: true, default: '' }
});

module.exports = mongoose.model('Text', textSchema);
