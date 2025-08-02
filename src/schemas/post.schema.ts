export const createPostSchema = {
  summary: 'Crear post',
  tags: ['Posts'],
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', minLength: 3 },
      content: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Post creado',
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        authorId: { type: 'number' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  },
};

export const getPostSchema = {
  summary: 'Obtener post por ID',
  tags: ['Posts'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'Post encontrado',
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        published: { type: 'boolean' },
        authorId: { type: 'number' },
        media: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              url: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

export const updatePostSchema = {
  summary: 'Actualizar post',
  tags: ['Posts'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Post actualizado',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

export const uploadMediaSchema = {
  summary: 'Subir archivos al post',
  tags: ['Posts'],
  consumes: ['multipart/form-data'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'Media subida',
      type: 'object',
      properties: {
        urls: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  },
};

export const deleteMediaSchema = {
  summary: 'Eliminar media del post',
  tags: ['Posts'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  body: {
    type: 'object',
    required: ['urls'],
    properties: {
      urls: {
        type: 'array',
        items: { type: 'string' },
      },
    },
  },
  response: {
    200: {
      description: 'Media eliminada',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

export const deletePostSchema = {
  summary: 'Eliminar post',
  tags: ['Posts'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: {
      description: 'Post eliminado',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
