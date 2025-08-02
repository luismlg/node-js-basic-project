import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { broadcastNotification } from '../services/NotificationService';
import { sendNotificationSchema } from '../schemas/notification.schema';


const notification = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.post('/send', {
    schema: sendNotificationSchema,
  }, async (req, reply) => {
    const { message } = req.body as { message: string };

    if (!message) {
      return reply.status(400).send({ error: 'Missing message' });
    }

    broadcastNotification({ type: 'new_message', message });

    return reply.send({ status: 'sent' });
  });
};

export default notification;
