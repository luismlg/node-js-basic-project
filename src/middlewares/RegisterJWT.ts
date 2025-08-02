import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

export async function registerJwt(server: FastifyInstance) {
  await server.register(fastifyCookie);
  await server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
    cookie: {
      cookieName: "TOKEN_SECURE",
      signed: false,
    },
  });

  server.decorate("checkJwt", async (request, reply) => {
    try {
      const jwtPayload = await request.jwtVerify<{
        userId: number;
        email: string;
        roles: string;
      }>();

      const { userId, email, roles } = jwtPayload;

      const newToken = server.jwt.sign(
        { userId, email, roles },
        { expiresIn: "20h" }
      );

      reply.setCookie("TOKEN_SECURE", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      request.user = { userId, email, roles };
    } catch (error) {
      reply.status(401).send({ message: "Token is not valid" });
    }
  });
}
