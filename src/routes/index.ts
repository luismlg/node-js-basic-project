import { FastifyInstance } from "fastify";
import user from "./user";
import authRoutes from "./auth";
import post from "./post";
import notification from "./notification";

async function routes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(user, { prefix: "/user" });
  fastify.register(post, { prefix: "/post" });
  fastify.register(notification, { prefix: "/notification" });
}

export default routes;
