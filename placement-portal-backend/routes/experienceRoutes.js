const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware"); // updated import

// Get all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching experiences." });
  }
});

// Add a new experience (logged-in users)
router.post("/", isAuthenticated, async (req, res) => {
  const { name, company, role, experience } = req.body;
  if (!name || !company || !role || !experience) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const newExp = new Experience({ name, company, role, experience });
    await newExp.save();
    res.status(201).json(newExp);
  } catch (err) {
    res.status(500).json({ message: "Server error while saving experience." });
  }
});

// Update experience (admin only)
router.put("/:id", isAuthenticated, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, company, role, experience } = req.body;

  try {
    const updatedExp = await Experience.findByIdAndUpdate(
      id,
      { name, company, role, experience },
      { new: true }
    );
    if (!updatedExp) return res.status(404).json({ message: "Experience not found." });
    res.json(updatedExp);
  } catch (err) {
    res.status(500).json({ message: "Server error while updating experience." });
  }
});

// Delete experience (admin only)
router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExp = await Experience.findByIdAndDelete(id);
    if (!deletedExp) return res.status(404).json({ message: "Experience not found." });
    res.json({ message: "Experience deleted successfully.", deleted: deletedExp });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting experience." });
  }
});

module.exports = router;
