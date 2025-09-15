const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: String },
    eligibility: { type: String },
    date: { type: Date },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Placement", placementSchema);
