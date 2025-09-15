const Experience = require("../models/Experience");

exports.addExperience = async (req, res) => {
  try {
    const { name, company, role, experience } = req.body;
    const newExperience = new Experience({ name, company, role, experience });
    await newExperience.save();
    res.status(201).json({ message: "Experience saved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while saving experience." });
  }
};
