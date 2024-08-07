import prisma from '../utils/PrismaClient';

export const createUser = async (data: { email: string, password: string, name?: string }) => {
  return prisma.user.create({ data });
};