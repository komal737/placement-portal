const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  responder: { type: String, required: true }, // name of student/admin replying
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const questionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  question: { type: String, required: true },
  answers: [answerSchema], // array of replies
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
