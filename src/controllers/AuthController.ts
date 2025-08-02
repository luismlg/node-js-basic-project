import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";

export class AuthController {
  static async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return reply
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }

    const token = request.server.jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      { expiresIn: "20h" }
    );

    reply.setCookie("TOKEN_SECURE", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return reply.send({ message: "Login successful", token });
  }

  static logout = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie("TOKEN_SECURE", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return reply.send({ message: "Logged out successfully" });
  };
}
