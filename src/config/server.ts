import fastify from 'fastify';
import routes from '../routes';
import { registerJwt } from '../middlewares/RegisterJWT';
import { registerWebSocket } from '../config/websocket';
import { registerMultipart } from '../config/multipart';
import { registerStatic } from '../config/static';
import { registerSwagger } from '../config/swagger';

export class Server {
  private static _instance: Server;
  private fastify = fastify({ logger: true });

  private constructor() {}

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public async start() {
    await registerJwt(this.fastify);
    await registerWebSocket(this.fastify);
    await registerMultipart(this.fastify);
    await registerStatic(this.fastify);
    await registerSwagger(this.fastify);

    this.fastify.register(routes);

    this.fastify.listen({ port: 8000 }, (err, address) => {
      if (err) {
        this.fastify.log.error(err);
        process.exit(1);
      }
      this.fastify.log.info(`🚀 Server listening on ${address}`);
    });
  }
}
