import multipart from '@fastify/multipart';

export const registerMultipart = async (app) => {
  app.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 },
  });
};
