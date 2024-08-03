import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const yourRoute = (server: FastifyInstance, options: FastifyPluginOptions, done: Function) => {
  server.get('/', async (request, reply) => {
    return { hello: 'world' };
    });
  done();
};

export default yourRoute;