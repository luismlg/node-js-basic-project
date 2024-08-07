import { FastifyReply, FastifyRequest } from 'fastify';


export class Validations {

    static validateRegisterData = async (request: FastifyRequest, reply: FastifyReply, next: Function) => {
        const { email } = request.body as { email: string };

        if (!email) {
            reply.status(400).send({ error: 'Email is required' });
        } else {
            next();
        }
    };

}