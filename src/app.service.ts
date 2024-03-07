import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BlogCreateDTO } from './dto/blog.create';
import { UserCreateDTO } from './dto/user.create';

@Injectable()
export class AppService {
  public prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = new PrismaClient();
  }
  async getBlogs(): Promise<any> {
    return this.prismaClient.blog.findMany();
  }

  async getUsers(): Promise<any> {
    return this.prismaClient.user.findMany();
  }

  async createBlog(userId: string, body: BlogCreateDTO): Promise<any> {
    if (!userId || !body) {
      throw new NotFoundException('User ID or request body is missing');
    }

    const user = await this.prismaClient.user.findUnique({
      where: {
        userID: userId,
      },
    });
    if (!user) {
      console.log('thrown');
      throw new NotFoundException('User with this ID not exist');
    }

    return this.prismaClient.blog.create({
      data: {
        title: body.title,
        description: body.description,
        userId: userId,
      },
    });
  }

  async createUser(body: UserCreateDTO) {
    return Promise.resolve(undefined);
  }
}
