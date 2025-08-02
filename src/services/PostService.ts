import { MultipartFile } from "@fastify/multipart";
import prisma from "../config/prisma";
import { MediaService } from "./MediaService";

export const createPost = async (data: {
  title: string;
  content?: string;
  authorId: number;
}) => {
  return prisma.post.create({ data });
};

export const getPostById = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      media: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const updatePost = async (
  postId: number,
  userId: number,
  data: { title?: string; content?: string }
) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) throw new Error("Post not found");
  if (post.authorId !== userId) throw new Error("Forbidden");

  const updated = await prisma.post.update({
    where: { id: postId },
    data,
  });

  return updated;
};

export const uploadPostMedia = async (
  postId: number,
  userId: number,
  files: MultipartFile[]
) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId !== userId) {
    throw new Error("You cannot upload media to this post");
  }

  const urls = await MediaService.saveMultipleFiles(files, `post-${postId}`);

  await prisma.postMedia.createMany({
    data: urls.map((url) => ({
      url,
      postId,
    })),
  });

  return urls;
};

export const deletePostMedia = async (
  postId: number,
  userId: number,
  mediaIds: number[]
) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");
  if (post.authorId !== userId) throw new Error("Forbidden");

  const media = await prisma.postMedia.findMany({
    where: {
      id: { in: mediaIds },
      postId,
    },
  });

  if (media.length === 0) throw new Error("No media found");

  const urls = media.map((m) => m.url);

  try {
    await MediaService.deleteFiles(urls);
  } catch (err) {
    throw new Error("Failed to delete media files");
  }

  try {
    await prisma.postMedia.deleteMany({
      where: {
        id: { in: mediaIds },
        postId,
      },
    });
    return { deleted: media.length };
  } catch (err) {
    throw new Error("Failed to delete media from database");
  }
};

export const deletePost = async (postId: number, userId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.authorId !== userId) {
    throw new Error("You cannot delete this post");
  }
  await prisma.post.delete({
    where: { id: postId },
  });
  return { message: "Post deleted successfully" };
};