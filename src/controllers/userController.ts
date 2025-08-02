import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import { UserService } from "../services/UserService";
import { createUserSchema, updateUserSchema } from "../validators/user.schema";
import { getUserIdOrThrow } from "../utils/getUserIdOrThrow";
import { broadcastNotification } from "../services/NotificationService";

export class UserController {
  static createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { value, error } = createUserSchema.validate(request.body);
    if (error) {
      return reply.status(400).send({ error: error.message });
    }
    try {
      value.password = bcrypt.hashSync(value.password, 8);
      const user = await UserService.createUser(value);
      broadcastNotification({
        type: "new_user",
        id: user.id,
        name: user.name,
      });
      reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send({ error: (error as Error).message });
    }
  };

  static getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = getUserIdOrThrow(request, reply);
    if (!userId) return;
    const { id } = request.params as { id: string };
    const targetUserId = parseInt(id);
    if (isNaN(targetUserId)) {
      return reply.status(400).send({ error: "Invalid user ID" });
    }
    try {
      const user = await UserService.getUserById(targetUserId);
      if (!user) {
        return reply.status(404).send({ error: "User not found" });
      }
      reply.send(user);
    } catch (error) {
      reply.status(400).send({ error: (error as Error).message });
    }
  };

  static updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { value, error } = updateUserSchema.validate(request.body);
    if (error) {
      return reply.status(400).send({ error: error.message });
    }

    const userId = getUserIdOrThrow(request, reply);
    if (!userId) return;

    try {
      const updatedUser = await UserService.updateUser(userId, value);
      reply.send(updatedUser);
    } catch (error) {
      reply.status(400).send({ error: (error as Error).message });
    }
  };

  static uploadAvatar = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const userId = getUserIdOrThrow(request, reply);
    if (!userId) return;

    const file = await request.file();
    if (!file) {
      return reply.status(400).send({ error: "No file uploaded" });
    }

    try {
      const uploadedAvatar = await UserService.uploadAvatar(userId, file);
      reply.send(uploadedAvatar);
    } catch (error) {
      reply.status(400).send({ error: (error as Error).message });
    }
  };

  static deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const authUser = request.user as { userId?: number; role?: string };
    const authUserId = authUser?.userId;
    const authRole = authUser?.role;

    if (!authUserId || !authRole) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const { id } = request.params as { id: string };
    const targetUserId = parseInt(id);

    if (authRole !== "admin" && authUserId !== targetUserId) {
      return reply.status(403).send({ error: "Forbidden" });
    }

    try {
      await UserService.deleteUser(targetUserId);
      reply.send({ message: "User deleted" });
    } catch (error) {
      reply.status(400).send({ error: (error as Error).message });
    }
  };
}
