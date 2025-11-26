import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createUrlSchema } from "../validators/urlValidators.js";
import {
  createShortUrl,
  redirectUrl,
  getStatsController,
} from "../controllers/urlController.js";

const router = Router();

router.post("/", authMiddleware, validate(createUrlSchema), createShortUrl);

router.get("/stats/:shortCode", getStatsController);

router.get("/:shortCode", redirectUrl);

export default router;
