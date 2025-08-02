import { FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    checkJwt: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
