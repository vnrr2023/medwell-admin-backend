const express = require("express");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes); // Register user routes

module.exports = app;
