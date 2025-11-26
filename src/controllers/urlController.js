import { nanoid } from "nanoid";
import {
  createUrl,
  findByShortCode,
  incrementClick,
  getStats,
} from "../models/urlModel.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { longUrl } = req.body;

    const shortCode = nanoid(7);

    await createUrl(userId, longUrl, shortCode);

    return res.status(201).json({
      success: true,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
    });
  } catch (err) {
    next(err);
  }
};

export const redirectUrl = async (req, res, next) => {
  try {
    const shortCode = req.params.shortCode;

    const data = await findByShortCode(shortCode);
    if (!data) {
      const err = new Error("URL not found");
      err.status = 404;
      throw err;
    }

    await incrementClick(shortCode);

    return res.json({
      success: true,
      message: "Redirect working (testing mode)",
      longUrl: data.longUrl,
      shortCode: shortCode,
    });
  } catch (err) {
    next(err);
  }
};

export const getStatsController = async (req, res, next) => {
  try {
    const shortCode = req.params.shortCode;

    const stats = await getStats(shortCode);
    if (!stats) {
      const err = new Error("Stats not found");
      err.status = 404;
      throw err;
    }

    return res.json({
      success: true,
      stats,
    });
  } catch (err) {
    next(err);
  }
};
