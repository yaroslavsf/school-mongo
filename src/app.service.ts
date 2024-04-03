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

    const user = await this.prismaClient.user.findFirst({
      where: {
        userID: userId,
      },
    });
    if (!user) {
      console.log('thrown');
      throw new NotFoundException('User with this ID not exist');
    }

    const m = new Date();
    // eslint-disable-next-line prettier/prettier
    const dateString = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

    return this.prismaClient.blog.create({
      data: {
        title: body.title,
        description: body.description,
        timestamp: dateString,
        userId: userId,
      },
    });
  }

  async createUser(body: UserCreateDTO) {
    const m = new Date();
    // eslint-disable-next-line prettier/prettier
    const dateString = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

    return this.prismaClient.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
        timestamp: dateString,
        profileImage: Buffer.from(body.profile_image),
      },
    });
  }

  async createLike(userId: string, blogId: string) {
    const m = new Date();
    // eslint-disable-next-line prettier/prettier
    const dateString = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();


    const user = await this.prismaClient.user.findFirst({
      where: {
        userID: userId,
      },
    });
    if (!user) {
      console.log('thrown');
      throw new NotFoundException('User with this ID not exist');
    }
    const blog = await this.prismaClient.blog.findFirst({
      where: {
        blogID: blogId,
      },
    });
    if (!blog) {
      console.log('thrown');
      throw new NotFoundException('Blog with this ID not exist');
    }

    return this.prismaClient.like.create({
      data: {
        userId: userId,
        blogId: blogId,
        timestamp: dateString,
      },
    });
  }

  async getLikesByBlogId(blogId: string) {
    const blog = await this.prismaClient.blog.findFirst({
      where: {
        blogID: blogId,
      },
    });
    if (!blog) {
      console.log('thrown');
      throw new NotFoundException('Blog with this ID not exist');
    }

    return this.prismaClient.like.findMany({
      where: {
        blogId: blogId,
      },
    });
  }

  async getLikesByUserId(userId: string) {
    const user = await this.prismaClient.user.findFirst({
      where: {
        userID: userId,
      },
    });
    if (!user) {
      console.log('thrown');
      throw new NotFoundException('User with this ID not exist');
    }
    return this.prismaClient.like.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async deleteUserById(userId: string) {
    const user = await this.prismaClient.user.findFirst({
      where: {
        userID: userId,
      },
    });
    if (!user) {
      console.log('thrown');
      throw new NotFoundException('User with this ID not exist');
    }

    return this.prismaClient.user.delete({
      where: {
        userID: userId,
      },
    });
  }

  async deleteBlogById(blogId: string) {
    const blog = await this.prismaClient.blog.findFirst({
      where: {
        blogID: blogId,
      },
    });
    if (!blog) {
      console.log('thrown');
      throw new NotFoundException('Blog with this ID not exist');
    }

    return this.prismaClient.blog.delete({
      where: {
        blogID: blogId,
      },
    });
  }

  async deleteLike(userId: string, blogId: string) {
    const user = await this.prismaClient.user.findFirst({
      where: {
        userID: userId,
      },
    });
    if (!user) {
      console.log('thrown');
      throw new NotFoundException('User with this ID not exist');
    }
    const blog = await this.prismaClient.blog.findFirst({
      where: {
        blogID: blogId,
      },
    });
    if (!blog) {
      console.log('thrown');
      throw new NotFoundException('Blog with this ID not exist');
    }

    const like = await this.prismaClient.like.findFirst({
      where: {
        userId: userId,
        blogId: blogId,
      },
    });
    if (!like) {
      console.log('thrown');
      throw new NotFoundException('Like with those ID not exist');
    }

    return this.prismaClient.like.delete({
      where: {
        likeID: like.likeID,
      },
    });
  }

  async updateBlogById(blogId: string, body: BlogCreateDTO) {
    const blog = await this.prismaClient.blog.findFirst({
      where: {
        blogID: blogId,
      },
    });
    if (!blog) {
      console.log('thrown');
      throw new NotFoundException('Blog with this ID not exist');
    }

    return this.prismaClient.blog.update({
      where: {
        blogID: blogId,
      },
      data: {
        ...body,
      },
    });
  }
}
