const express = require("express");
const { sql} = require("../db/db");

const router = express.Router();

// ✅ Get all users
router.get("/getUser", async (req, res) => {
  try {
    const users = await sql`SELECT * FROM doctor_doctorprofile`;
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

// Update verification status
router.put("/verify/:id", async (req, res) => {
  const { id } = req.params;
  const { verified } = req.body;

  try {
      // Ensure verified is a boolean
      if (typeof verified !== "boolean") {
          return res.status(400).json({ message: "Invalid value for verified. Must be true or false." });
      }

      // Update the verified column
      const result = await sql`
          UPDATE doctor_doctorprofile 
          SET verified = ${verified}
          WHERE id = ${id}
          RETURNING *;
      `;

      if (result.count === 0) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({status: 200, message: "User verification status updated successfully", user: result[0] });
  } catch (error) {
      console.error("Error updating verification status:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/checkserver', async (req, res) => {
  res.status(200).json({ status: 200, message: "Server is up and running 🚀" });
});

module.exports = router;
