export const sendNotificationSchema = {
  summary: 'Enviar notificación',
  tags: ['Notifications'],
  body: {
    type: 'object',
    required: ['message'],
    properties: {
      message: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Notificación enviada',
      type: 'object',
      properties: {
        status: { type: 'string' },
      },
    },
    400: {
      description: 'Falta el campo message',
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
};
