import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../config/prisma";
import { z } from "zod";

export class UserController {
  static createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    // Validación de entrada
    const userSchema = z.object({
      email: z.string().email(),
      name: z.string().optional(),
    }).required();

    try {
      const userData = userSchema.parse(request.body);
      const user = await prisma.user.create({
        data: {
            email: userData.email,
            name: userData.name,
        },
      });
      reply.send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  };

  static getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!user) {
        return reply.status(404).send({ error: "User not found" });
      }
      reply.send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  };

  static updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const userSchema = z.object({
      email: z.string().email(),
      name: z.string().optional(),
    });
    const { id } = request.params as { id: string };
    try {
      const userData = userSchema.parse(request.body);
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: userData,
      });
      reply.send(user);
    } catch (error) {
      reply.status(400).send(error);
    }
  };

  static deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    try {
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      reply.send({ message: "User deleted" });
    } catch (error) {
      reply.status(400).send(error);
    }
  };
}
