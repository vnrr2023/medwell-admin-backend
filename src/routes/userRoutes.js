const express = require("express");
const { put } = require("@vercel/blob"); // Import `put` function
const User = require("../models/User");
const upload = require("../middleware/upload");

const router = express.Router();

// 🔹 Get all users
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

// 🔹 POST route for adding a user with file uploads
router.post("/addUser", upload.array("documents", 5), async (req, res) => {
  try {
    const { name, type, specialty, email, phone, age, experience, education, languages, certifications, publications, researchInterests, professionalMemberships, awards, isApproved } = req.body;

    // ✅ Ensure files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "No documents uploaded",
      });
    }

    // ✅ Upload files to Vercel Blob storage
    const uploadedDocuments = await Promise.all(
      req.files.map(async (file) => {
        const blob = await put(file.originalname, file.buffer, {
          access: "public", // Public file access
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        return {
          name: file.originalname,
          url: blob.url, // Store the public URL in MongoDB
        };
      })
    );

    // ✅ Create new user
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
      documents: uploadedDocuments,
    });

    await newUser.save();
    res.status(201).json({
      status: 201,
      message: "User added successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// 🔹 Approve user (update `isApproved`)
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

    res.status(200).json({
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
