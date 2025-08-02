export const loginSchema = {
  summary: 'Login de usuario',
  tags: ['Auth'],
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Login exitoso',
      type: 'object',
      properties: {
        message: { type: 'string' },
        token: { type: 'string' },
      },
    },
    401: {
      description: 'Credenciales inválidas',
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
};

export const logoutSchema = {
  summary: 'Cerrar sesión',
  tags: ['Auth'],
  response: {
    200: {
      description: 'Sesión cerrada correctamente',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
