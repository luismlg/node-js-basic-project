import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "es"] } })
    .required(),
  name: Joi.string().optional(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const updateUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "es"] } })
    .optional(),
  name: Joi.string().optional(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .optional(),
});
