import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { UserController } from '../controllers/UserController';
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  uploadAvatarSchema,
  deleteUserSchema,
} from '../schemas/user.schema';

const user = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.post('/', {
    schema: createUserSchema,
  }, UserController.createUser);

  server.get('/:id', {
    preHandler: [server.checkJwt],
    schema: getUserSchema,
  }, UserController.getUser);

  server.post('/avatar', {
    preHandler: [server.checkJwt],
    schema: uploadAvatarSchema,
  }, UserController.uploadAvatar);

  server.put('/', {
    preHandler: [server.checkJwt],
    schema: updateUserSchema,
  }, UserController.updateUser);

  server.delete('/:id', {
    preHandler: [server.checkJwt],
    schema: deleteUserSchema,
  }, UserController.deleteUser);
};

export default user;
