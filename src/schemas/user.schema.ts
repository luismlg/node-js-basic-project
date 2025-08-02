export const createUserSchema = {
  summary: 'Registrar nuevo usuario',
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
      name: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Usuario creado',
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string' },
        avatarUrl: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  },
};

export const getUserSchema = {
  summary: 'Obtener usuario por ID',
  tags: ['Users'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'Usuario encontrado',
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string' },
        avatarUrl: { type: 'string' },
      },
    },
  },
};

export const updateUserSchema = {
  summary: 'Actualizar datos del usuario autenticado',
  tags: ['Users'],
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Usuario actualizado',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

export const uploadAvatarSchema = {
  summary: 'Subir avatar del usuario',
  tags: ['Users'],
  consumes: ['multipart/form-data'],
  response: {
    200: {
      description: 'Avatar subido',
      type: 'object',
      properties: {
        url: { type: 'string' },
      },
    },
  },
};

export const deleteUserSchema = {
  summary: 'Eliminar usuario por ID',
  tags: ['Users'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'Usuario eliminado',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
