const postgres = require("postgres");
require("dotenv").config();

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require", // Ensures SSL is used for Supabase connections
});

const connectDB = async () => {
  try {
    await sql`SELECT 1`; // Simple query to check connection
    console.log("✅ PostgreSQL Connected");
  } catch (error) {
    console.error("❌ PostgreSQL Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = { sql, connectDB };
