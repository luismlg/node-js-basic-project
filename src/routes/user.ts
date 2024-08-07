import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { Validations } from '../middlewares/Validations';
import { UserController } from "../controllers/UserController";
const fastify = require('fastify')({ logger: true });

const user = (
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: Function
) => {
  server.post("/users", { preHandler: [Validations.validateRegisterData, fastify.CheckJWT] }, UserController.createUser);
  server.get("/users/:id", UserController.getUser);
  server.put("/users/:id", UserController.updateUser);
  server.delete("/users/:id", UserController.deleteUser);
  done();
};

export default user;
