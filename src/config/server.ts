import { error } from "console";
import fastify from "fastify";
import routes from "../routes";


export class Server {
  private static _instance: Server;
  private fastify = fastify({ logger: true });

  constructor() {
    this.fastify;
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public async start() {

    this.fastify.register(routes);

    this.fastify.listen(
      { port: 8000 },
      (err: Error | null, address: string) => {
        if (err) {
          this.fastify.log.error(err);
          process.exit(1);
        }
        this.fastify.log.info(`server listening on ${address}`);
      }
    );
    
  }
}
