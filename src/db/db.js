const postgres = require("postgres");
require("dotenv").config();

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});


const connectDB = async () => {
  try {
    await sql`SELECT 1`;
    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error("❌ PostgreSQL Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = { sql, connectDB };
