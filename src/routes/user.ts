import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { UserController } from "../controllers/userController";

const user = (
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: Function
) => {
  server.post("/users", UserController.createUser);
  server.get("/users/:id", UserController.getUser);
  server.put("/users/:id", UserController.updateUser);
  server.delete("/users/:id", UserController.deleteUser);
  done();
};

export default user;
