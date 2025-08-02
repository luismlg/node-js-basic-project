import fastifyStatic from '@fastify/static';
import path from 'path';
import fs from 'fs';

export const registerStatic = async (app) => {
  const uploadDir = path.join(__dirname, '..', '..', 'uploads');
  fs.mkdirSync(uploadDir, { recursive: true });

  app.register(fastifyStatic, {
    root: uploadDir,
    prefix: '/uploads/',
  });
};
