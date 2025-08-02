import { FastifyRequest, FastifyReply } from "fastify";
import Joi from "joi";
import {
  createPost,
  getPostById,
  uploadPostMedia,
  deletePost,
  deletePostMedia,
  updatePost,
} from "../services/PostService";
import { createPostSchema, updatePostSchema } from "../validators/post.schema";
import { getUserIdOrThrow } from "../utils/getUserIdOrThrow";

export class PostController {
  static async createPost(request: FastifyRequest, reply: FastifyReply) {
    const { error, value } = createPostSchema.validate(request.body);
    if (error) return reply.status(400).send({ error: error.message });

    const userId = getUserIdOrThrow(request, reply);
    if (!userId) return;

    try {
      const post = await createPost({
        title: value.title,
        content: value.content,
        authorId: userId,
      });
      return reply.send(post);
    } catch (err) {
      return reply
        .status(500)
        .send({ message: "Error creating post", error: err });
    }
  }

  static async getPost(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const postId = parseInt(id);
    if (isNaN(postId))
      return reply.status(400).send({ error: "Invalid post ID" });

    try {
      const post = await getPostById(postId);
      return reply.send(post);
    } catch (err) {
      return reply.status(404).send({ error: (err as Error).message });
    }
  }

  static async updatePost(request: FastifyRequest, reply: FastifyReply) {
    const userId = getUserIdOrThrow(request, reply);
    if (!userId) return;

    const { id } = request.params as { id: string };
    const postId = parseInt(id);
    if (isNaN(postId))
      return reply.status(400).send({ error: "Invalid post ID" });

    const { error, value } = updatePostSchema.validate(request.body);
    if (error) return reply.status(400).send({ error: error.message });

    try {
      const updated = await updatePost(postId, userId, value);
      return reply.send(updated);
    } catch (err) {
      return reply.status(400).send({ error: (err as Error).message });
    }
  }

  static async uploadPostMedia(request: FastifyRequest, reply: FastifyReply) {
    const userId = getUserIdOrThrow(request, reply);
    if (!userId) return;

    const { id } = request.params as { id: string };
    const postId = parseInt(id);
    if (isNaN(postId))
      return reply.status(400).send({ error: "Invalid post ID" });

    const filesIterator = await request.files();
    const files = [];
    for await (const file of filesIterator) {
      files.push(file);
    }

    if (files.length === 0) {
      return reply.status(400).send({ error: "No files uploaded" });
    }

    try {
      const urls = await uploadPostMedia(postId, userId, files);
      return reply.status(201).send({ message: "Images uploaded", urls });
    } catch (err) {
      return reply.status(400).send({ error: (err as Error).message });
    }
  }

  static async deletePostMedia(request: FastifyRequest, reply: FastifyReply) {
    const userId = getUserIdOrThrow(request, reply);
    if (!userId) return;

    const { id } = request.params as { id: string };
    const postId = parseInt(id);
    if (isNaN(postId))
      return reply.status(400).send({ error: "Invalid post ID" });

    const body = request.body as { mediaIds: number[] };
    if (!Array.isArray(body.mediaIds) || body.mediaIds.length === 0) {
      return reply.status(400).send({ error: "No media IDs provided" });
    }

    try {
      const result = await deletePostMedia(postId, userId, body.mediaIds);
      return reply.send(result);
    } catch (err) {
      return reply.status(400).send({ error: (err as Error).message });
    }
  }

  static async deletePost(request: FastifyRequest, reply: FastifyReply) {
    const userId = getUserIdOrThrow(request, reply);
    if (!userId) return;

    const { id } = request.params as { id: string };
    const postId = parseInt(id);
    if (isNaN(postId))
      return reply.status(400).send({ error: "Invalid post ID" });
    try {
      const result = await deletePost(postId, userId);
      return reply.send(result);
    } catch (err) {
      return reply.status(400).send({ error: (err as Error).message });
    }
  }
}
