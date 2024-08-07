import prisma from '../utils/PrismaClient';

export const createPost = async (data: { title: string, content?: string, authorId: number }) => {
  return prisma.post.create({ data });
};