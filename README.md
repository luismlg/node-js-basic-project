# 🛠️ Fastify Starter Project - Auth, Uploads, Realtime, Swagger

Proyecto técnico de backend usando **Fastify** con TypeScript. Incluye autenticación con JWT, subida de imágenes, sockets en tiempo real, documentación Swagger modular y arquitectura escalable.

## ✨ Tecnologías

* [Fastify](https://fastify.dev/)
* TypeScript
* [Prisma](https://www.prisma.io/) + PostgreSQL
* JWT (cookies HttpOnly)
* File Upload (multipart)
* WebSockets
* Swagger (Fastify Swagger UI)
* Jest (testing)
* Docker
* Arquitectura modular y limpia

## ✅ Funcionalidades implementadas

### 💾 Autenticación (JWT con cookies)

* Login / Logout
* Middleware `checkJwt` protegido
* Cookies seguras y HttpOnly
* Protección de rutas

### 👤 Gestión de usuarios

* CRUD de usuario
* Validaciones con Zod
* Relaciones con posts

### 📷 Subida de archivos

* Endpoint `POST /user/avatar` y `/posts/:id/images`
* Upload de imágenes con validación
* Servicio `MediaService` para gestionar la lógica
* Archivos estáticos servidos desde `/uploads`

### 📝 Posts

* CRUD con validación y control de propiedad
* Relación con usuario
* Asociar múltiples imágenes

### 🔔 Notificaciones en tiempo real

* WebSocket con Fastify
* Canal `/send` que emite eventos a todos los clientes conectados

### 🧪 Tests

* Cobertura básica con Jest
* Tests para autenticación, subida de imágenes y errores

### 📚 Documentación Swagger

* Disponible en `/docs`
* Modular, separada por archivos
* Compatible con validaciones y ejemplos de respuesta

## 🥪 Ejecutar Tests

```bash
npm run test
```

## ▶️ Cómo iniciar

1. Clona el repo:

   ```bash
   git clone git@github.com:luismlg/node-js-basic-project.git
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Crea el `.env`:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/mydb
   JWT_SECRET=tu_clave_secreta
   ```

4. Inicializa Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Arranca el servidor:

   ```bash
   npm run dev
   ```

6. Accede a la documentación:

   * [http://localhost:8000/docs](http://localhost:8000/docs)

## ✨ Autor

Luis Antonio Cañas Arrones
🔳 [GitHub](github.com/luismlg)
📧 [LinkedIn](https://www.linkedin.com/in/luis-antonio-ca%C3%B1as-arrones-2b677255/)
