import { FastifyInstance } from 'fastify';
import user from './user';

async function routes(fastify: FastifyInstance) {
    fastify.register(user, { prefix: '/user' });
}

export default routes;