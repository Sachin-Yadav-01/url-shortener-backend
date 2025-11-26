import Joi from "joi";

export const createUrlSchema = Joi.object({
  longUrl: Joi.string().uri().required(),
});
