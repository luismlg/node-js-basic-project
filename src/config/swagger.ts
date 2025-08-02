import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export const registerSwagger = async (app) => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Node.js API',
        description: 'Documentación de la API para la prueba técnica',
        version: '1.0.0',
      },
      tags: [
        { name: 'Auth', description: 'Autenticación de usuarios' },
        { name: 'Users', description: 'Gestión de usuarios' },
        { name: 'Posts', description: 'Publicaciones' },
        { name: 'Notifications', description: 'Notificaciones en tiempo real' },
      ],
      servers: [{ url: 'http://localhost:8000' }],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  });
};
