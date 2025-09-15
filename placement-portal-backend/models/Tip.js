// File: models/Tip.js
const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  company: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tip", tipSchema);
