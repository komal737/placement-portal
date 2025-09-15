const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  experience: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Experience", experienceSchema);
