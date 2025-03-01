const express = require("express");
const User = require("../models/User");
const upload = require("../middleware/upload");

const router = express.Router();

// Get all users
router.get("/getUser", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// POST route for user with file uploads
router.post("/addUser", upload.array("documents", 5), async (req, res) => {
  try {
    const {
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
    } = req.body;

    const documentFiles = req.files.map((file) => ({
      name: file.originalname,
      url: file.path, // Save file path
    }));

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
    res.status(201).json({
      status: 201,
      message: "User added successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.type,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
      error: error.message,
    });
  }
});

// ✅ Route to update isApproved status
router.put("/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    if (typeof isApproved !== "boolean") {
      return res.status(400).json({
        status: 400,
        message: "Invalid isApproved value",
        error: "isApproved should be a boolean (true/false)",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    res.json({
      status: 200,
      message: "User approval status updated",
      data: {
        id: user._id,
        name: user.name,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.error("Error updating isApproved:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
