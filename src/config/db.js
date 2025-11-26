import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "url_shortener",
  connectionLimit: 10,
});

const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("MySQL database connected successfully");
  } catch (err) {
    console.error("MySQL connection error:", err.message);
    process.exit(1);
  }
};
export { pool, connectDB };
