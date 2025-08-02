import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { PostController } from '../controllers/PostController';
import {
  createPostSchema,
  getPostSchema,
  updatePostSchema,
  uploadMediaSchema,
  deleteMediaSchema,
  deletePostSchema,
} from '../schemas/post.schema';

const postRoutes = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.post('/', {
    preHandler: [server.checkJwt],
    schema: createPostSchema,
  }, PostController.createPost);

  server.get('/:id', {
    preHandler: [server.checkJwt],
    schema: getPostSchema,
  }, PostController.getPost);

  server.put('/:id', {
    preHandler: [server.checkJwt],
    schema: updatePostSchema,
  }, PostController.updatePost);

  server.post('/:id/media', {
    preHandler: [server.checkJwt],
    schema: uploadMediaSchema,
  }, PostController.uploadPostMedia);

  server.delete('/:id/media', {
    preHandler: [server.checkJwt],
    schema: deleteMediaSchema,
  }, PostController.deletePostMedia);

  server.delete('/:id', {
    preHandler: [server.checkJwt],
    schema: deletePostSchema,
  }, PostController.deletePost);
};

export default postRoutes;
