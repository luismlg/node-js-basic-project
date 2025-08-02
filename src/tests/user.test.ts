import Fastify from "fastify";
import multipart from "@fastify/multipart";
import app from "../routes/index";
import prisma from "../config/prisma";

describe("User API", () => {
  const server = Fastify();
  beforeAll(async () => {
    server.decorate("checkJwt", async (request, reply) => {
      request.user = { id: 1, role: "user" };
    });

    server.register(multipart);
    server.register(app);
    await server.ready();
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: { contains: "testuser" } },
    });

    await server.close();
  });

  it("Crea un usuario válido", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/user",
      payload: {
        name: "Test User",
        email: `testuser_${Date.now()}@mail.com`,
        password: "12345678",
      },
    });

    expect(response.statusCode).toBe(201);

    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("email");
  });

  it("Falla al crear usuario sin email", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/user",
      payload: {
        name: "No Email User",
        password: "12345678",
      },
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("error");
  });
});
