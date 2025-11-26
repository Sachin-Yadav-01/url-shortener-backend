import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

app.use(errorHandler);

export default app;
