require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyJwt = require('@fastify/jwt');
const fastifyCookie = require('@fastify/cookie');

// Registrar los plugins
fastify.register(fastifyCookie);
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
  cookie: {
    cookieName: 'TOKEN_SECURE',
    signed: false,
  },
});

fastify.decorate('checkJwt', async (request, reply, next) => {
  // Obtener el token de la cabecera Authorization
  const token = request.headers.authorization?.split(' ')[1] || request.cookies.TOKEN_SECURE;
  if (!token) {
    reply.status(401).send({ message: 'No token provided' });
    return;
  }

  let jwtPayload;
  // Intentar validar el token y obtener los datos
  try {
    jwtPayload = await request.jwtVerify(token);
  } catch (error) {
    reply.status(401).send({ message: 'Token is not valid' });
    return;
  }

  // El token es válido por 20 horas
  const { userId, email } = jwtPayload;
  const newToken = fastify.jwt.sign({ userId, email }, { expiresIn: '20h' });

  // Configurar la nueva cookie con el nuevo token
  reply.setCookie('TOKEN_SECURE', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Asegúrate de que secure esté en true en producción
    path: '/',
  });

  // Agregar los datos del usuario a la request
  request.user = { userId, email };

  // Llamar al siguiente middleware o controlador
  next();
});
