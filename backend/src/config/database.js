const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
    if (process.env.NODE_ENV === "production") {
      console.log("Retrying database connection in 5 seconds...");
      setTimeout(connectDB, 5000);
    }
  }
}

module.exports = { pool, connectDB };
