const Placement = require("../models/placement");

// Add a new placement (admin only)
const addPlacement = async (req, res) => {
    try {
        const { companyName, role, salary, eligibility, date, description } = req.body || {};

        // Validate required fields
        if (!companyName || !role || !salary || !eligibility || !date || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPlacement = new Placement({
            companyName,
            role,
            salary,
            eligibility,
            date:new Date(date),
            description
        });

        await newPlacement.save();
        res.status(201).json({ message: "Placement added successfully", placement: newPlacement });
    } catch (error) {
        console.error('Add Placement Error:', error);  // ✅ Detailed logging
        res.status(500).json({ message: "Server error" });
    }
};

const getPlacements = async (req, res) => {
    try {
        const placements = await Placement.find().sort({ createdAt: -1 });
        res.status(200).json(placements);
    } catch (error) {
        console.error('Get Placements Error:', error);
        res.status(500).json({ message: "Server error" });
    }
};
// Edit a placement
const editPlacement = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Placement.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Placement not found" });
        res.status(200).json({ message: "Placement updated", placement: updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a placement
const deletePlacement = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Placement.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Placement not found" });
        res.status(200).json({ message: "Placement deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addPlacement, getPlacements, editPlacement, deletePlacement };

