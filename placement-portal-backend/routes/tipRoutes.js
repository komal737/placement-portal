// File: routes/tipRoutes.js
const express = require("express");
const router = express.Router();
const Tip = require("../models/Tip");

// Add a new tip
router.post("/", async (req, res) => {
  try {
    const { title, content, author, company } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newTip = new Tip({ title, content, author, company });
    await newTip.save();
    res.status(201).json(newTip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all tips
router.get("/", async (req, res) => {
  try {
    const tips = await Tip.find().sort({ date: -1 });
    res.json(tips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
