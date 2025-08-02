import path from "path";
import prisma from "../config/prisma";
import fs from "fs/promises";
import { MediaService } from "./MediaService";
import { MultipartFile } from "@fastify/multipart";

export class UserService {
  static createUser = async (data: {
    email: string;
    password: string;
    name?: string;
  }) => {
    return prisma.user.create({ data });
  };

  static getUserById = async (id: number) => {
    return prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
  };

  static updateUser = async (
    id: number,
    data: { email?: string; name?: string }
  ) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  };

  static uploadAvatar = async (userId: number, file: MultipartFile) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.avatarUrl) {
      const previousPath = path.join(__dirname, "..", "..", user.avatarUrl);
      try {
        await fs.unlink(previousPath);
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
          console.error("Error deleting old avatar:", err);
        }
      }
    }
  const avatarUrl = await MediaService.saveFile(file, `avatar-${userId}`);

  return await prisma.user.update({
    where: { id: userId },
    data: { avatarUrl },
  });
  };

  static deleteUser = async (id: number) => {
    return prisma.user.delete({
      where: { id },
    });
  };
}
