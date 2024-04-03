import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { BlogCreateDTO } from './dto/blog.create';
import { UserCreateDTO } from './dto/user.create';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/blogs')
  getBlogs(): Promise<any> {
    return this.appService.getBlogs();
  }

  @Post('/users/:id/blog')
  createBlog(
    @Param('id') userId: string,
    @Body() body: BlogCreateDTO,
  ): Promise<any> {
    return this.appService.createBlog(userId, body);
  }

  @Post('like/user/:userid/blog/:blogid')
  createLike(
    @Param('userid') userId: string,
    @Param('blogid') blogId: string,
  ): Promise<any> {
    return this.appService.createLike(userId, blogId);
  }

  @Get('/like/blog/:id')
  getLikeOfBlog(@Param('id') blogId: string): Promise<any> {
    return this.appService.getLikesByBlogId(blogId);
  }

  @Get('/like/user/:id')
  getLikeByUser(@Param('id') userId: string): Promise<any> {
    return this.appService.getLikesByUserId(userId);
  }

  @Get('/users')
  getUsers(): Promise<any> {
    return this.appService.getUsers();
  }
  @Post('/register')
  createUser(@Body() body: UserCreateDTO): Promise<any> {
    return this.appService.createUser(body);
  }

  @Delete('/user/:id')
  deleteUser(@Param('id') userId: string): Promise<any> {
    return this.appService.deleteUserById(userId);
  }
  @Delete('/blog/:id')
  deleteBlog(@Param('id') blogId: string): Promise<any> {
    return this.appService.deleteBlogById(blogId);
  }

  @Put('/blog/:id')
  updateBlog(@Param('id') blogId: string,  @Body() body: BlogCreateDTO,): Promise<any> {
    return this.appService.updateBlogById(blogId, body);
  }

  @Delete('like/user/:userid/blog/:blogid')
  deleteLike(
    @Param('userid') userId: string,
    @Param('blogid') blogId: string,
  ): Promise<any> {
    return this.appService.deleteLike(userId, blogId);
  }
}
