const express = require("express");
const User = require("../models/User");
const upload = require("../middleware/upload");

const router = express.Router();

// Get all users
router.get("/getUser", async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from MongoDB
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// POST route for user with file uploads
router.post("/addUser", upload.array("documents", 5), async (req, res) => {
  try {
    // Extract user data from the request
    const { name, type, specialty, email, phone, age, experience, education, languages, certifications, publications, researchInterests, professionalMemberships, awards, isApproved } = req.body;

    // Extract file URLs
    const documentFiles = req.files.map(file => ({
      name: file.originalname,
      url: file.path, // Save file path
    }));

    // Create new user
    const newUser = new User({
      name,
      type,
      specialty,
      email,
      phone,
      age,
      experience,
      education,
      languages,
      certifications,
      publications,
      researchInterests,
      professionalMemberships,
      awards,
      isApproved,
      documents: documentFiles,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Route to update isApproved status
router.put("/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body; // Expecting { isApproved: true } or { isApproved: false }

    if (typeof isApproved !== "boolean") {
      return res.status(400).json({ error: "Invalid isApproved value" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ isApproved: user.isApproved });
  } catch (error) {
    console.error("Error updating isApproved:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
