import Fastify from "fastify";
import app from "../routes/index";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

let server: ReturnType<typeof Fastify>;

beforeAll(async () => {
  server = Fastify();

  server.decorate("checkJwt", async (request, reply) => {
    request.user = { id: 1, role: "user" };
  });
  server.register(jwt, { secret: process.env.JWT_SECRET! });
  server.register(cookie);
  await prisma.user.create({
    data: {
      name: "Login Test",
      email: "login@test.com",
      password: bcrypt.hashSync("12345678", 8),
    },
  });

  server.register(app);
  await server.ready();
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: "login@test.com" },
  });

  await server.close();
});

describe("Auth API", () => {
  it("Login exitoso con credenciales válidas", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "login@test.com",
        password: "12345678",
      },
    });
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("token");
  });

  it("Login fallido con credenciales incorrectas", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "login@test.com",
        password: "wrong-password",
      },
    });

    expect(response.statusCode).toBe(401);
  });
});
