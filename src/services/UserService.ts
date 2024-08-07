import prisma from '../utils/PrismaClient';


export class UserService {
  static createUser = async (data: { email: string, password: string, name?: string }) => {
    return prisma.user.create({ data });
  };

  static getUser = async (id: number) => {
    return prisma.user.findUnique({
      where: { id },
    });
  };

  static updateUser = async (id: number, data: { email: string, name?: string }) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  };

  static deleteUser = async (id: number) => {
    return prisma.user.delete({
      where: { id },
    });
  };
}