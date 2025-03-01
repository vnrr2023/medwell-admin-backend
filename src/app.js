const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

module.exports = app;
