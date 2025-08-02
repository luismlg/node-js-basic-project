import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().optional(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  content: Joi.string().optional(),
});
