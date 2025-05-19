const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // t.ex. "startsidatext"
  content: { type: String, required: true }
});

module.exports = mongoose.model("Text", textSchema);
