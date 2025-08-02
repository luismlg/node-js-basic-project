import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { AuthController } from "../controllers/AuthController";
import { loginSchema, logoutSchema } from "../schemas/auth.schema";

const authRoutes = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.post("/login", { schema: loginSchema }, AuthController.login);
  server.post(
    "/logout",
    { preHandler: [server.checkJwt], schema: logoutSchema },
    AuthController.logout
  );
};

export default authRoutes;
