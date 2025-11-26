import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findByEmail, createUser } from "../models/userModel.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await findByEmail(email);
    if (existing) {
      const err = new Error("Email already registered");
      err.status = 400;
      throw err;
    }

    const hashed = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, hashed);

    return res.status(201).json({
      success: true,
      data: { id: userId, name, email },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findByEmail(email);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.status = 400;
      throw err;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error("Invalid credentials");
      err.status = 400;
      throw err;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.json({
      success: true,
      token,
    });
  } catch (err) {
    next(err);
  }
};
