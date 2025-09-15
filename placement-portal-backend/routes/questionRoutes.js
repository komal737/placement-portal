const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const { isAuthenticated } = require("../middleware/authMiddleware"); // destructure correctly

// POST a new question
router.post("/", async (req, res) => {
  try {
    const { name, question } = req.body;
    if (!name || !question) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = await Question.create({ name, question });
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST an answer to a question (logged-in users)
router.post("/:id/reply", isAuthenticated, async (req, res) => {
  try {
    const { responder, text } = req.body;
    if (!responder || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.answers.push({ responder, text });
    const updated = await question.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
