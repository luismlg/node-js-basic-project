import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../config/prisma";
import Joi from "joi";
import bcrypt from "bcrypt";
import { UserService } from "../services/UserService";

export class UserController {
  static createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    // Validación de entrada
    const userSchema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "es"] },
      }),
      name: Joi.string().optional(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    }).required();

    try {
      const userData = userSchema.validate(request.body);
      userData.value.password = bcrypt.hashSync(userData.value.password, 8);
      const user = UserService.createUser(userData.value);
      reply.status(200).send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  };

  static getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    try {
      const user = UserService.getUser(parseInt(id));
      if (!user) {
        return reply.status(404).send({ error: "User not found" });
      }
      reply.send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  };

  static updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const userSchema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "es"] },
      }),
      name: Joi.string().optional(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    }).required();
    const { id } = request.params as { id: string };
    try {
      const userData = userSchema.validate(request.body);
      const user = UserService.updateUser(parseInt(id), userData.value);
      reply.send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  };

  static deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    try {
      UserService.deleteUser(parseInt(id));
      reply.send({ message: "User deleted" });
    } catch (error) {
      reply.status(400).send(error);
    }
  };
}
