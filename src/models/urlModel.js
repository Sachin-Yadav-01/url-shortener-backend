import { pool } from "../config/db.js";

export const createUrl = async (userId, longUrl, shortCode) => {
  await pool.execute(
    "INSERT INTO urls (userId, longUrl, shortCode) VALUES (?, ?, ?)",
    [userId, longUrl, shortCode]
  );
  return shortCode;
};

export const findByShortCode = async (shortCode) => {
  const [rows] = await pool.execute(
    "SELECT * FROM urls WHERE shortCode = ? LIMIT 1",
    [shortCode]
  );
  return rows[0];
};

export const incrementClick = async (shortCode) => {
  await pool.execute(
    "UPDATE urls SET clickCount = clickCount + 1 WHERE shortCode = ?",
    [shortCode]
  );
};

export const getStats = async (shortCode) => {
  const [rows] = await pool.execute(
    "SELECT longUrl, clickCount, createdAt FROM urls WHERE shortCode = ? LIMIT 1",
    [shortCode]
  );
  return rows[0];
};
